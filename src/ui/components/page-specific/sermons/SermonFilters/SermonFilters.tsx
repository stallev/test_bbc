import dynamic from "next/dynamic";
import { useClientTranslationFunction } from "@/hooks/useLocale";
import { CustomDatePicker, Text, Icon } from "@/ui/components/ui-kit";
import { DEFAULT_SERMONS_FILTER_STATE } from "@/constants/mock";
import { RenderingSermonCardDataType } from "@/types/WPDataTypes/SermonPostsDataTypes";

import styles from "./styles/sermons-filters.module.scss";

import { SermonsFiltersComponentProps, SermonsFiltersProps } from "./types";
import { Button } from "@/ui/components/ui-kit";

const CustomSimpleSelect = dynamic(
  () => import("@/ui/components/ui-kit/CustomSimpleSelect")
);

const SermonFilters: React.FC<SermonsFiltersComponentProps> = ({
  categoriesData,
  fullSermonsList,
  filters,
  setFilters,
  setSermons,
  sermons,
}) => {
  const translate = useClientTranslationFunction();

  const resetFilters = () => {
    setFilters(DEFAULT_SERMONS_FILTER_STATE);
  };

  const isResetBtnActive = (
    Object.keys(filters) as (keyof SermonsFiltersProps)[]
  ).some(
    (filterKey) =>
      filters[filterKey] != DEFAULT_SERMONS_FILTER_STATE[filterKey]
  );

  const filterAndSortSermons = (
    sermons: RenderingSermonCardDataType[],
    filterState: SermonsFiltersProps
  ): RenderingSermonCardDataType[] => {
    const filteredSermons = sermons.filter((sermon) => {
      const { biblebooks, preachers, topics, startDate, endDate } = filterState;

      const sermonDate = new Date(sermon.sermonDate);
      const startFilterDate = new Date(startDate);
      const endFilterDate = new Date(endDate);

      if (
        biblebooks !== "all" &&
        !sermon.biblebooks.some((item) => item.id === biblebooks)
      ) {
        return false;
      }

      if (
        preachers !== "all" &&
        !sermon.preachers.some((item) => item.id === preachers)
      ) {
        return false;
      }

      if (
        topics !== "all" &&
        !sermon.topics.some((item) => item.id === topics)
      ) {
        return false;
      }

      return sermonDate >= startFilterDate && sermonDate <= endFilterDate;
    });

    const sortedSermons = filteredSermons.sort(
      (a, b) =>
        new Date(a.sermonDate).getTime() - new Date(b.sermonDate).getTime()
    );

    return sortedSermons;
  };

  const getSearchedSermons = async (filterKey: string, filterValue: any) => {
    const activeFilters = {
      ...filters,
      [filterKey]: filterValue,
    };
    setFilters(activeFilters);

    const searchedSermons = filterAndSortSermons(
      fullSermonsList,
      activeFilters
    );

    setSermons({
      ...sermons,
      searchedSermons: [...searchedSermons],
    });
  };

  const handleCategoriesOnChange = (
    filterKey: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    getSearchedSermons(filterKey, event.target.value);
  };

  const handleStartDateOnChange = (dateValue: Date) => {
    getSearchedSermons("startDate", dateValue);
  };

  const handleEndDateOnChange = (dateValue: Date) => {
    getSearchedSermons("endDate", dateValue);
  };

  const handlePreachersOnChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleCategoriesOnChange("preachers", event);
  };

  const handleBibleBooksOnChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleCategoriesOnChange("biblebooks", event);
  };

  const handleTopicsOnChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleCategoriesOnChange("topics", event);
  };

  return (
    <div className={styles["sermons-filters"]}>
      <div className={styles["sermons-filters__categories"]}>
        <CustomSimpleSelect
          options={categoriesData.biblebooks}
          name="Books"
          title={translate("bible_books_list_name")}
          defaultValueText={translate("all_bible_books")}
          onChangeValue={handleBibleBooksOnChange}
          selectedValue={filters.biblebooks}
          ariaLabel={translate("bible_books_list_name")}
        />

        <CustomSimpleSelect
          options={categoriesData.preachers}
          name="Preachers"
          title={translate("preachers_list_name")}
          defaultValueText={translate("all_preachers")}
          onChangeValue={handlePreachersOnChange}
          selectedValue={filters.preachers}
          ariaLabel={translate("preachers_list_name")}
        />

        <CustomSimpleSelect
          options={categoriesData.topics}
          name="Topics"
          title={translate("topics_list_name")}
          defaultValueText={translate("all_topics")}
          onChangeValue={handleTopicsOnChange}
          selectedValue={filters.topics}
          ariaLabel={translate("topics_list_name")}
        />

        <CustomDatePicker
          className={styles["sermons-filters__date-picker"]}
          title={translate("start_dates_range")}
          selectedValue={filters.startDate}
          minDate={DEFAULT_SERMONS_FILTER_STATE.startDate}
          maxDate={filters.endDate}
          onChangeValue={handleStartDateOnChange}
          calendarAriaLabel="start date"
        />

        <CustomDatePicker
          className={styles["sermons-filters__date-picker"]}
          title={translate("end_dates_range")}
          selectedValue={filters.endDate}
          onChangeValue={handleEndDateOnChange}
          minDate={filters.startDate}
          maxDate={DEFAULT_SERMONS_FILTER_STATE.endDate}
          calendarAriaLabel="end date"
        />

        {isResetBtnActive && (
          <Button
            className={styles["sermons-filters__reset-btn"]}
            type="primary"
            onClick={resetFilters}
          >
            <Text textType="span">{translate("reset")}</Text>

            <Icon
              className={styles["sermons-filters__reset-btn-icon"]}
              iconName="rightArrow"
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SermonFilters;
