"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useClientTranslationFunction } from "@/hooks/useLocale";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import { Text } from "@/ui/components/ui-kit";
import SermonFilters from "../SermonFilters/SermonFilters";
import { SermonsContentProps, SermonsListProps } from "./types";
import { DEFAULT_SERMONS_FILTER_STATE, CARDS_PORTION } from "@/constants/mock";
import { SermonsFiltersProps } from "../SermonFilters/types";

import styles from "./styles/sermons-content.module.scss";

const SermonCardsList = dynamic(
  () => import("../SermonCardsList/SermonCardsList")
);

const SermonsContent: React.FC<SermonsContentProps> = ({
  contentData,
  sermonsData,
  sermonsCategories,
}) => {
  const translate = useClientTranslationFunction();

  const [sermons, setSermons] = useState<SermonsListProps>({
    currentSermons: sermonsData.slice(0, CARDS_PORTION),
    searchedSermons: [],
  });
  const [filters, setFilters] = useState<SermonsFiltersProps>(
    DEFAULT_SERMONS_FILTER_STATE
  );

  const [offset, setOffset] = useState(CARDS_PORTION);

  const isActiveSearchedSermons = filters != DEFAULT_SERMONS_FILTER_STATE;

  const searchedSermonsMessage =
    isActiveSearchedSermons && !!sermons.searchedSermons.length
      ? translate("yes_searched_sermons") +
        sermons.searchedSermons.length.toString()
      : translate("no_searched_sermons");

  const fetchMoreData = () => {
    const newData = sermonsData.slice(offset, offset + CARDS_PORTION);
    setSermons({
      ...sermons,
      currentSermons: [...sermons.currentSermons, ...newData],
    });
    setOffset(offset + CARDS_PORTION);
  };

  useEffect(() => {
    setSermons({
      currentSermons: sermonsData.slice(0, CARDS_PORTION),
      searchedSermons: [],
    });
  }, [sermonsData]);

  return (
    <div className={styles["sermons-content"]}>
      <Container isNarrowContent>
        <StructuredMarkdownContent
          content={contentData}
          className={styles["sermons-content__markdown"]}
          isFontSizeResizable={false}
        />
      </Container>
      <Container>
        <div className={styles["sermons-content__sermons-data"]}>
          <SermonFilters
            categoriesData={sermonsCategories}
            fullSermonsList={sermonsData}
            filters={filters}
            setFilters={setFilters}
            setSermons={setSermons}
            sermons={sermons}
          />

          <div className={styles["sermons-content__sermons-list"]}>
            {isActiveSearchedSermons && (
              <Text textType="p">{searchedSermonsMessage}</Text>
            )}

            <SermonCardsList
              fetchMoreData={fetchMoreData}
              data={
                !isActiveSearchedSermons
                  ? sermons.currentSermons
                  : sermons.searchedSermons
              }
              hasMore={offset < sermonsData.length}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SermonsContent;
