import { Metadata } from 'next';

import { RoutePath } from '@/constants';
import { SAME_AUTHOR_POST_CARD_POST_PAGE_COUNT } from '@/constants/mock';
import BlogDataApi from '@/services/BlogDataApi';
import styles from '@/styles/pages/pastors-post.module.scss';
import { PastorsPostParams } from '@/types/postTypes';
import BlogPostAuthorDate from '@/ui/components/page-specific/blog/BlogPostAuthorDate/BlogPostAuthorDate';
import RelatedPosts from '@/ui/components/page-specific/blog/RelatedPosts/RelatedPosts';
import StructuredMarkdownContent from '@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent';
import { Text, CustomImage } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';
import { getTranslations } from '@/utils/languageParser';

export async function generateStaticParams() {
  return [];
}

export const revalidate  = 86400;

export async function generateMetadata(props: {
  params: Promise<PastorsPostParams>;
}): Promise<Metadata> {
  const params = await props.params;
  const data = await BlogDataApi.getPastorsPostItemDataBySlug(
    params.postSlug,
    params.locale,
    params.author
  );

  if (!data) {
    return {};
  }

  const seoPathData = getPagePathData({
    locale: params.locale,
    path: `${RoutePath.Blog}/${params.postSlug}`,
  });

  return getSeoData({ seoContentData: data.seo, seoPathData });
}

export default async function PastorsPostPage(props: { params: Promise<PastorsPostParams> }) {
  const params = await props.params;
  const translations = getTranslations(params.locale);
  const { postData, postsListBySameAuthor } = await BlogDataApi.getPastorsPostItemDataBySlug(
    params.postSlug,
    params.locale,
    params.author
  );

  const relatedPosts = postsListBySameAuthor.slice(0, SAME_AUTHOR_POST_CARD_POST_PAGE_COUNT);

  if (!postData) {
    return (
      <div>
        <meta httpEquiv="refresh" content={`0;url=${RoutePath.NotFoundPage}`} />
      </div>
    );
  }

  return (
    <Container>
      <Text textType="h1" className={styles['pastors-post__title']}>
        {postData?.title}
      </Text>

      <BlogPostAuthorDate date={postData.date} author={postData.author.authorFullName} />

      {postData.featuredImageData.isExist && (
        <CustomImage
          imageURL={postData.featuredImageData.featuredImageUrl}
          alt={postData.title}
          className={styles['pastors-post__post-image']}
        />
      )}

      <StructuredMarkdownContent
        content={postData.blocks}
        className={styles['pastors-post__page-content']}
        isFontSizeResizable={false}
      />

      {!!postsListBySameAuthor.length && (
        <RelatedPosts
          posts={relatedPosts}
          authorData={postData.author}
          translations={translations}
          locale={params.locale}
        />
      )}
    </Container>
  );
}
