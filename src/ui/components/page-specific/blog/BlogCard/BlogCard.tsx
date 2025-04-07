"use client"

import React from 'react';
import Link from 'next/link';
import { RoutePath } from '@/constants';
import { Text, CustomImage } from '@/ui/components/ui-kit';
import ReadMoreLink from '@/ui/components/ui-kit/ReadMoreLink/ReadMoreLink';
import { getDayMonthFormattedDate } from '@/utils/dateFormatter';
import { useClientTranslationFunction, useLocale } from '@/hooks/useLocale';
import { BlogCardProps } from './types';

import styles from './styles/blog-card.module.scss';

const BlogCard = ({
  data,
  index = 1,
  isLandingPage = false
}: {
  data: BlogCardProps,
  index: number
  isLandingPage?: boolean
}) => {
  const translate = useClientTranslationFunction();
  const locale = useLocale();

  const postLink = `${RoutePath.BlogAuthor}/${data.author.slug}/${data.slug}`;
  const imagePriorityLoading = !isLandingPage ? (index < 1 ? true : false) : false;

  return (
    <article className={styles["blog-card"]}>
      <Text
        textType='span'
        className={styles['blog-card__start-date']}
      >
        {getDayMonthFormattedDate(data.simpleDate, locale)}
      </Text>

      <CustomImage
        imageURL={data.featuredImageData.featuredImageUrl}
        className={styles["blog-card__image"]}
        alt={data.title}
        priority={imagePriorityLoading}
        ariaLabel={data.title}
        sizes="(min-width: 1024px) 100vw, 33vw"
      />

      <Link
        aria-label="Blog post link"
        tabIndex={0}
        href={postLink}
        className={styles["blog-card__title"]}
      >
        <Text
          textType='h2'
        >
          {data.title}
        </Text>
      </Link>

      <Text
        textType='p'
        className={styles["blog-card__description"]}
      >
        {data.excerpt}
      </Text>
      
      <Text
        textType='p'
        className={styles["blog-card__author"]}
      >
        {data.author.authorFullName}
      </Text>

      <ReadMoreLink
        to={postLink}
        label={translate("more_link_label")}
        className={styles['blog-card__readmore-link']}
      />
    </article>
  )
};

export default BlogCard;
