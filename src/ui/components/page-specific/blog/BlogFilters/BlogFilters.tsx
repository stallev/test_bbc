import React from 'react';
import dynamic from 'next/dynamic';
import useTranslationFunction from '@/hooks/useTranslationFunction';
import { DEFAULT_BLOG_POSTS_FILTER_STATE, ALL_TAXONOMY_ITEMS_NAME } from '@/constants/mock';
import { Button } from '@/ui/components/ui-kit';
import { BlogFiltersComponentsProps } from './types';
import { BlogCardProps } from '../BlogCard/types';
import { BlogFiltersProps } from '../BlogContent/types';

const CustomSimpleSelect = dynamic(() => import('@/ui/components/ui-kit/CustomSimpleSelect2'));

import styles from './styles/blog-filters.module.scss';

const BlogFilters: React.FC<BlogFiltersComponentsProps> = ({
  categoriesData,
  fullPostsList,
  filters,
  setFilters,
  setPosts,
  posts
}) => {
  const translate = useTranslationFunction();

  const resetFilters = () => {
    setFilters(DEFAULT_BLOG_POSTS_FILTER_STATE);
  };

  const filterAndSortPosts = (
    posts: BlogCardProps[],
    filterState: BlogFiltersProps
  ): BlogCardProps[] => {
    const filteredPosts = posts.filter((post) => {
      const { authors, years, topics } = filterState;

      if (authors !== ALL_TAXONOMY_ITEMS_NAME && !post.author.id.includes(authors)) {
        return false;
      }

      if (years !== ALL_TAXONOMY_ITEMS_NAME && !post.date.year.includes(years)) {
        return false;
      }

      return true;
    });
  
    const sortedPosts = filteredPosts.sort(
      (a, b) => b.date.timestamp - a.date.timestamp
    );
  
    return sortedPosts;
  }

  const getSearchedPosts = async (filterKey: string, filterValue: any) => {
    const activeFilters = {
      ...filters,
      [filterKey]: filterValue,
    };
    setFilters(activeFilters);

    const searchedPosts = filterAndSortPosts(fullPostsList, activeFilters);

    setPosts({
      ...posts,
      searchedPosts: [
        ...searchedPosts,
      ],
    });
  }

  const handleCategoriesOnChange = (filterKey: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    getSearchedPosts(filterKey, event.target.value);
  };

  const handleAuthorsOnChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleCategoriesOnChange('authors', event);
  };

  const handleYearsOnChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleCategoriesOnChange('years', event);
  };
  
  return (
    <div className={styles["blog-filters"]}>
      <CustomSimpleSelect
        options={categoriesData.authorsData}
        name='Authors'
        title={translate("authors_list_name")}
        defaultValueText={translate("all_authors")}
        onChangeValue={handleAuthorsOnChange}
        selectedValue={filters.authors}
        ariaLabel={translate("authors_list_name")}
        className={styles["blog-filters__select"]}
      />
      <CustomSimpleSelect
        options={categoriesData.yearsData}
        name='Years'
        title={translate("years_list_name")}
        defaultValueText={translate("all_years")}
        onChangeValue={handleYearsOnChange}
        selectedValue={filters.years}
        ariaLabel={translate("years_list_name")}
        className={styles["blog-filters__select"]}
      />
      <Button
        className={styles["blog-filters__reset-btn"]}
        buttonTitle={translate("reset")}
        onClick={resetFilters}
      />
    </div>
  )
}

export default BlogFilters;
