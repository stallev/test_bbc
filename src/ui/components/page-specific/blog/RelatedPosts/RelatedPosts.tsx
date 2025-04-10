import Link from 'next/link';
import React from 'react';

import { RoutePath } from '@/constants';
import { PASTORS_POST_BLOCK_ID } from '@/constants/mock';
import { Locale, i18n } from '@/i18n.config';
import { authorFinishedContentProps } from '@/types/postTypes';
import { Icon } from '@/ui/components/ui-kit';

import { BlogCardProps } from '../BlogCard/types';
import RelatedPostCard from '../RelatedPostCard/RelatedPostCard';
import styles from './styles/related-posts.module.scss';

interface RelatedPostsProps {
  posts: BlogCardProps[];
  translations: Record<string, string>;
  authorData: authorFinishedContentProps;
  locale: Locale;
}

const RelatedPosts = ({ posts, translations, authorData, locale }: RelatedPostsProps) => {
  const authorPageLink =
    locale === i18n.defaultLocale
      ? `${RoutePath.Staff}/${authorData.slug}`
      : `${RoutePath.Staff}/${authorData.slug}-ru`;
  return (
    <div className={styles['related-posts']}>
      <Link
        className={styles['related-posts__link']}
        href={`${authorPageLink}#${PASTORS_POST_BLOCK_ID}`}
        prefetch={true}
      >
        <span>{translations.another_posts_by_author}</span>

        <Icon className={styles['related-posts__link-icon']} iconName="rightArrow" />
      </Link>

      <div className={styles['related-posts__list']}>
        {posts.map(post => (
          <RelatedPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
