import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import useTranslationFunction from '@/hooks/useTranslationFunction';
import { CARDS_PORTION } from '@/constants/mock';
import { DEFAULT_BLOG_POSTS_FILTER_STATE } from '@/constants/mock';
import BlogFilters from '../BlogFilters/BlogFilters';
import { BlogContentProps, BlogPostsStateProps, BlogFiltersProps } from './types';

import styles from './styles/blog-content.module.scss';

const BlogCardsList = dynamic(() => import('../BlogCardsList/BlogCardsList'));

const BlogContent:React.FC<BlogContentProps> = ({
  postsData,
  postsCategories,
}) => {
  const translate = useTranslationFunction();

  const [posts, setPosts] = useState<BlogPostsStateProps>({
    currentPosts: postsData.slice(0, CARDS_PORTION),
    searchedPosts: [],
  });
  const [filters, setFilters] = useState<BlogFiltersProps>(DEFAULT_BLOG_POSTS_FILTER_STATE);

  const [offset, setOffset] = useState(CARDS_PORTION);

  const isActiveSearchedPosts = filters != DEFAULT_BLOG_POSTS_FILTER_STATE;

  const fetchMoreData = () => {
    const newData = postsData.slice(offset, offset + CARDS_PORTION); 
    setPosts({
      ...posts,
      currentPosts: [...posts.currentPosts, ...newData]
    });
    setOffset(offset + CARDS_PORTION);
  };

  useEffect(() => {
    setPosts({
      currentPosts: postsData.slice(0, CARDS_PORTION),
      searchedPosts: [],
    });

  }, [postsData]);

  return (
    <div className={styles["blog-content"]}>
      <BlogFilters
        categoriesData={postsCategories}
        fullPostsList={postsData}
        filters={filters}
        setFilters={setFilters}
        setPosts={setPosts}
        posts={posts}
      />
      
      <BlogCardsList
        data={!isActiveSearchedPosts ? posts.currentPosts : posts.searchedPosts}
        fetchMoreData={fetchMoreData}
        hasMore={offset < postsData.length}
        isReducedList={false}
      />
    </div>
  )
}

export default BlogContent;
