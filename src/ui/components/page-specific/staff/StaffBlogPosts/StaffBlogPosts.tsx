import React from "react";
import PostsList from "@/ui/components/page-specific/home/PastorsBlog/PostsList/PostsList";
import { Text } from "@/ui/components/ui-kit";
import { PASTORS_POST_BLOCK_ID } from "@/constants/mock";
import { StaffBlogPostsProps } from "./types";

import styles from "./styles/staff-blog-posts.module.scss";

const StaffBlogPosts = ({ data, translations }: StaffBlogPostsProps) => {
  return (
    <div className={styles["staff-blog-posts"]} id={PASTORS_POST_BLOCK_ID}>
      <Text className={styles["staff-blog-posts__title"]} textType="h2">
        {translations["posts_of_the_pastor"]}
      </Text>
      
      <PostsList data={data} />
    </div>
  );
};

export default StaffBlogPosts;
