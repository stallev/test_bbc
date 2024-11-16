import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { postSitemapFieldsItemProps } from '@/types/postTypes';
import BlogDataApi from '@/services/BlogDataApi';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const postsSlugList = await BlogDataApi.getPastorsPostsSitemapData();

  if (!!postsSlugList.length) {
    const sitemapFields = postsSlugList.map((item: postSitemapFieldsItemProps) => ({
      loc: `${siteUrl}blog/${item.slug}`,
      lastmod: item.modified,
    }));

    return getServerSideSitemapLegacy(ctx, sitemapFields);
  }

  return { props: {} };
};

export default function Sitemap() {}
