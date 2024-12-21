import React from 'react'
import Container from '@/ui/containers/Container/Container';
import { Text } from '@/ui/components/ui-kit';
import PostsList from './PostsList/PostsList';
import Donation from '@/ui/components/Donation/Donation';
import { BlogCardProps } from '@/ui/components/page-specific/blog/BlogCard/types';

import styles from "./styles/pastors-blog.module.scss";

interface PastorsBlogProps {
  data: BlogCardProps[]
  translations: Record<string, string>
}

const PastorsBlog = ({ translations, data }: PastorsBlogProps) => {

  return (
    <section className={styles["pastors-blog"]}>
      <Container>
        <Text
          textType='h2'
          className={styles["pastors-blog__title"]}
        >
          {translations.reflections_of_pastors}
        </Text>

        <PostsList
          data={data}
        />

        {/* <Donation isDonationPage={false} translations={translations} /> */}
      </Container>
    </section>
  )
}

export default PastorsBlog
