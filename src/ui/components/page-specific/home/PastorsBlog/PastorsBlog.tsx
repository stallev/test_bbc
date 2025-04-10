import React from 'react';

import { BlogCardProps } from '@/ui/components/page-specific/blog/BlogCard/types';
import { Text } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';

import PostsList from './PostsList/PostsList';
import styles from './styles/pastors-blog.module.scss';

interface PastorsBlogProps {
  data: BlogCardProps[];
  translations: Record<string, string>;
}

const PastorsBlog = ({ translations, data }: PastorsBlogProps) => {
  return (
    <section className={styles['pastors-blog']}>
      <Container>
        <Text textType="h2" className={styles['pastors-blog__title']}>
          {translations.reflections_of_pastors}
        </Text>

        <PostsList data={data} isLandingPage />
      </Container>
    </section>
  );
};

export default PastorsBlog;
