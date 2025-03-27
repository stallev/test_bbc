'use client'
import React, { useEffect } from "react";
import BlogDataApi from "@/services/BlogDataApi";
import { Text } from "@/ui/components/ui-kit";

import styles from "./styles/blog-post-author-date.module.scss";

interface BlogPostAuthorDateProps {
  date: string;
  author: string;
}

const BlogPostAuthorDate = ({ date, author }: BlogPostAuthorDateProps) => {
  return (
    <div className={styles["blog-post-author-date"]}>
      <Text textType="span" className={styles["blog-post-author-date__date"]}>
        {date}
      </Text>
      <Text textType="span" className={styles["blog-post-author-date__author"]}>
        {author}
      </Text>
    </div>
  );
};

export default BlogPostAuthorDate;
