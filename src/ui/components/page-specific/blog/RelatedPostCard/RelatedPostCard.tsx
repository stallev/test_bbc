import { RoutePath } from "@/constants";
import { CustomImage, CustomLink, Text } from "@/ui/components/ui-kit";
import { PostsListBySameAuthorItemType } from "@/types/postTypes";

import styles from "./styles/related-post-card.module.scss";

const RelatedPostCard = ({ post }: { post: PostsListBySameAuthorItemType }) => {
  return (
    <div className={styles["related-post-card"]}>
      <CustomImage
        imageURL={post.featuredImageUrl}
        alt={post.title}
        className={styles["related-post-card__image"]}
      />

      <CustomLink to={`${RoutePath.Blog}/${post.slug}`}>
        <Text textType="h4" className={styles["related-post-card__title"]}>
          {post.title}
        </Text>
      </CustomLink>
    </div>
  );
};

export default RelatedPostCard;
