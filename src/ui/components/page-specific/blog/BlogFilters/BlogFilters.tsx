"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useClientTranslationFunction } from "@/hooks/useLocale";
import {
  DEFAULT_BLOG_POSTS_FILTER_STATE,
  ALL_TAXONOMY_ITEMS_NAME,
} from "@/constants/mock";
import { Button, Icon, Text } from "@/ui/components/ui-kit";
import { BlogFiltersComponentsProps } from "./types";
import { BlogCardProps } from "../BlogCard/types";
import { BlogFiltersProps } from "../BlogContent/types";

const CustomSimpleSelect = dynamic(
  () => import("@/ui/components/ui-kit/CustomSimpleSelect")
);

import styles from "./styles/blog-filters.module.scss";

const BlogFilters: React.FC<BlogFiltersComponentsProps> = ({
  categoriesData,
  fullPostsList,
  filters,
  setFilters,
  setPosts,
  posts,
}) => {
  const translate = useClientTranslationFunction();

  const resetFilters = () => {
    setFilters(DEFAULT_BLOG_POSTS_FILTER_STATE);
  };

  const isResetBtnActive = (
    Object.keys(filters) as (keyof BlogFiltersProps)[]
  ).some(
    (filterKey) =>
      filters[filterKey] != DEFAULT_BLOG_POSTS_FILTER_STATE[filterKey]
  );

  const filterAndSortPosts = (
    posts: BlogCardProps[],
    filterState: BlogFiltersProps
  ): BlogCardProps[] => {
    const filteredPosts = posts.filter((post) => {
      const { authors, years, topics } = filterState;

      if (
        authors !== ALL_TAXONOMY_ITEMS_NAME &&
        !post.author.id.includes(authors)
      ) {
        return false;
      }

      if (
        years !== ALL_TAXONOMY_ITEMS_NAME &&
        !post.date.year.includes(years)
      ) {
        return false;
      }

      if (
        topics !== ALL_TAXONOMY_ITEMS_NAME &&
        !post.topics.some((topic) => topic === topics)
      ) {
        return false;
      }

      return true;
    });

    const sortedPosts = filteredPosts.sort(
      (a, b) => b.date.timestamp - a.date.timestamp
    );

    return sortedPosts;
  };

  const getSearchedPosts = async (filterKey: string, filterValue: any) => {
    const activeFilters = {
      ...filters,
      [filterKey]: filterValue,
    };
    setFilters(activeFilters);

    const searchedPosts = filterAndSortPosts(fullPostsList, activeFilters);

    setPosts({
      ...posts,
      searchedPosts: [...searchedPosts],
    });
  };

  const handleCategoriesOnChange = (
    filterKey: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    getSearchedPosts(filterKey, event.target.value);
  };

  const handleAuthorsOnChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleCategoriesOnChange("authors", event);
  };

  const handleYearsOnChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleCategoriesOnChange("years", event);
  };

  const handleTopicsOnChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleCategoriesOnChange("topics", event);
  };

  return (
    <div className={styles["blog-filters"]}>
      <div className={styles["blog-filters__select-wrapper"]}>
        <CustomSimpleSelect
          options={categoriesData.authorsData}
          name="Authors"
          title={translate("authors_list_name")}
          defaultValueText={translate("all_authors")}
          onChangeValue={handleAuthorsOnChange}
          selectedValue={filters.authors}
          ariaLabel={translate("authors_list_name")}
          className={styles["blog-filters__select"]}
        />

        <CustomSimpleSelect
          options={categoriesData.topicsData}
          name="Topics"
          title={translate("topics_list_name")}
          defaultValueText={translate("all_topics")}
          onChangeValue={handleTopicsOnChange}
          selectedValue={filters.topics}
          ariaLabel={translate("years_list_name")}
          className={styles["blog-filters__select"]}
        />

        <CustomSimpleSelect
          options={categoriesData.yearsData}
          name="Years"
          title={translate("years_list_name")}
          defaultValueText={translate("all_years")}
          onChangeValue={handleYearsOnChange}
          selectedValue={filters.years}
          ariaLabel={translate("years_list_name")}
          className={styles["blog-filters__select"]}
        />
      </div>

      {
        isResetBtnActive && (
          <Button
            className={styles["blog-filters__reset-btn"]}
            type="primary"
            onClick={resetFilters}
          >
            <Text textType="span">{translate("reset")}</Text>
            <Icon
              className={styles["blog-filters__reset-btn-icon"]}
              iconName="rightArrow"
            />
          </Button>
        )
      }
    </div>
  );
};

export default BlogFilters;
