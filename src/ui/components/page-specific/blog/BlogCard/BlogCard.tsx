import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RoutePath } from '@/constants';
import { Text } from '@/ui/components/ui-kit';
import useTranslationFunction from '@/hooks/useTranslationFunction';
import { BlogCardDataProps } from './types';

import styles from './styles/blog-card.module.scss';

const BlogCard:React.FC<BlogCardDataProps> = ({
  data,
  index = 1
}) => {
  const translate = useTranslationFunction();

  const postLink = `${RoutePath.Blog}/${data.slug}`;
  const imagePriorityLoading = index < 1 ? true : false;

  return (
    <div className={styles["blog-card"]}>
      <Link
        className={styles["blog-card__image-wrap"]}
        aria-label="Blog post link"
        tabIndex={0}
        href={postLink}
      >
        <Image
          src={data.featuredImageData.featuredImageUrl}
          fill
          alt={data.title}
          sizes='50vw'
          priority={imagePriorityLoading}
        />
      </Link>
      
      <div className={styles["blog-card__info"]}>
        <Link
          aria-label="Blog post link"
          tabIndex={0}
          href={postLink}
        >
          <Text
            textType='h2'
            className={styles["blog-card__title"]}
          >
            {data.title}
          </Text>
        </Link>

        <Text
          textType='p'
          className={styles["blog-card__excerpt"]}
        >
          {data.excerpt}
        </Text>

        <div className={styles["blog-card__post-meta"]}>
          <Text
            textType='span'
            className={styles["blog-card__reading-time"]}
          >
            {`${data.readingTime} ${translate("minute")}: ${translate("reading_time")}`}
          </Text>
          
          &#8728;

          <Text
            textType='span'
            className={styles["blog-card__published-date"]}
          >
            {data.date.postDateFormattedValue}
          </Text>
        </div>

        <Link
          href={postLink}
          tabIndex={0}
          aria-label="Blog post link"
          className={styles["blog-card__read-more-link"]}
        >
          {translate("more_link_label")}
        </Link>

        <Text
          textType='h3'
          className={styles["blog-card__author-name"]}
        >
          {data.author.authorFullName}
        </Text>
      </div>
    </div>
  )
};

export default BlogCard;
