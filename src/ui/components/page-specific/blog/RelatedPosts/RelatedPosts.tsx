import React from "react";
import Link from "next/link";
import RelatedPostCard from "../RelatedPostCard/RelatedPostCard";
import { RoutePath } from "@/constants";
import { Text, Icon } from "@/ui/components/ui-kit";
import {
  PostsListBySameAuthorItemType,
  authorFinishedContentProps,
} from "@/types/postTypes";

import styles from "./styles/related-posts.module.scss";

interface RelatedPostsProps {
  posts: PostsListBySameAuthorItemType[];
  translations: Record<string, string>;
  authorData: authorFinishedContentProps;
}

const RelatedPosts = ({
  posts,
  translations,
  authorData,
}: RelatedPostsProps) => {
  return (
    <div className={styles["related-posts"]}>
      <Link
        className={styles["related-posts__link"]}
        href={`${RoutePath.BlogAuthor}/${authorData.slug}`}
      >
        <span>{translations.another_posts_by_author}</span>
        
        <Icon
          className={styles["related-posts__link-icon"]}
          iconName="rightArrow"
        />
      </Link>

      <div className={styles["related-posts__list"]}>
        {posts.map((post) => (
          <RelatedPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
