import { RoutePath } from '@/constants';
import { NO_IMAGE } from '@/constants/mock';
import { CustomImage, CustomLink, Text } from '@/ui/components/ui-kit';

import { BlogCardProps } from '../BlogCard/types';
import styles from './styles/related-post-card.module.scss';

const RelatedPostCard = ({ post }: { post: BlogCardProps }) => {
  return (
    <div className={styles['related-post-card']}>
      <CustomImage
        imageURL={
          post.featuredImageData.isExist ? post.featuredImageData.featuredImageUrl : NO_IMAGE
        }
        alt={post.title}
        className={styles['related-post-card__image']}
      />

      <CustomLink to={`${RoutePath.BlogAuthor}/${post.author.slug}/${post.slug}`}>
        <Text textType="h4" className={styles['related-post-card__title']}>
          {post.title}
        </Text>
      </CustomLink>
    </div>
  );
};

export default RelatedPostCard;
