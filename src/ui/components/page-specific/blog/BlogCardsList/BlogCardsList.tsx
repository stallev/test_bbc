import React, { useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@/ui/components/ui-kit';
import { useOnceIntersection } from "@/hooks/useOnceIntersection";
import BlogCard from '../BlogCard/BlogCard';
import { BlogCardProps } from '../BlogCard/types';
import { BlogCardsListProps } from './types';

import styles from './styles/blog-card-list.module.scss';

const BlogCardsList: React.FC<BlogCardsListProps> = ({
  data,
  fetchMoreData,
  hasMore
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const isAnimated = useOnceIntersection(listRef);

  return (
    <div ref={listRef}>
      <InfiniteScroll
        className={`${styles["blog-cards-list"]} ${isAnimated ? styles.animated : ''}`}
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loader />}
      >
        {data.map((blogcard: BlogCardProps, index) => (
          <BlogCard
            key={blogcard.slug}
            data={blogcard}
            index={index}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default BlogCardsList