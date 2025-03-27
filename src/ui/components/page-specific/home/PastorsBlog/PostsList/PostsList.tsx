"use client";

import React, { useRef } from "react";
import { CustomLink, Text, Icon } from "@/ui/components/ui-kit";
import { RoutePath } from "@/constants";
import { useOnceIntersection } from "@/hooks/useOnceIntersection";
import { useClientTranslationFunction } from "@/hooks/useLocale";
import BlogCard from "@/ui/components/page-specific/blog/BlogCard/BlogCard";
import { BlogCardProps } from "@/ui/components/page-specific/blog/BlogCard/types";

import styles from "./styles/posts-list.module.scss";

const PostsList = ({
  data,
  isLandingPage = false,
}: {
  data: BlogCardProps[];
  isLandingPage?: boolean;
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const isAnimated = useOnceIntersection(listRef);
  const translate = useClientTranslationFunction();

  return (
    <div
      ref={listRef}
      className={`${styles["posts-list"]} ${isAnimated ? styles.animated : ""}`}
    >
      {data.map((blogcard: BlogCardProps, index: number) => (
        <BlogCard
          key={blogcard.slug}
          data={blogcard}
          index={index}
          isLandingPage
        />
      ))}

      {isLandingPage && (
        <CustomLink
          to={RoutePath.Blog}
          className={styles["posts-list__blog-link"]}
        >
          <Icon iconName="rightArrow" />

          <Text textType="span">{translate("pastors_blog_nav_link")}</Text>
        </CustomLink>
      )}
    </div>
  );
};

export default PostsList;
