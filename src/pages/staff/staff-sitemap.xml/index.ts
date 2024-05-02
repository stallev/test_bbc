import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import StaffDataApi from '@/services/StaffDataApi';
import { postSitemapFieldsItemProps } from '@/types/postTypes';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const postsSlugList = await StaffDataApi.getMinistersSitemapData();

  if (!!postsSlugList.length) {
    const sitemapFields = postsSlugList.map((item: postSitemapFieldsItemProps) => ({
      loc: `${siteUrl}staff/${item.slug}`,
      lastmod: item.modified,
    }));

    return getServerSideSitemapLegacy(ctx, sitemapFields);
  }

  return { props: {} };
};

export default function Sitemap() {}
