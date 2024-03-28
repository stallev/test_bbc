import React from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import useTranslationFunction from '@/hooks/useTranslationFunction';

import { SeoProps } from './types';

 const Seo:React.FC<SeoProps> = ({
  pageData,
 }: SeoProps) => {
  console.log('pageData is ', pageData);
  const {asPath, locale, defaultLocale} = useRouter();
  const translate = useTranslationFunction();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const ogImageUrl = !!pageData?.featuredImage
    ? pageData.featuredImage.node.mediaItemUrl
    : `${siteUrl}/default-og-image.jpg`;

  const canonicalUrl = locale == defaultLocale 
    ? `${siteUrl}${asPath}`
    : `${siteUrl}/${locale}${asPath}`;
  
  const ogLocale = `${locale}_${locale?.toUpperCase()}`

  const data = {
    title: pageData.title,
    titleTemplate: `%s | ${translate("site_name")}`,
    description: pageData.seo.metaDesc,
    canonical: canonicalUrl,
    openGraph: {
      url: canonicalUrl,
      title: pageData.title,
      description: pageData.seo.metaDesc,
      locale: ogLocale,
      images: [
        {
          url: ogImageUrl,
          width: 800,
          height: 600,
          alt: pageData.title,
          type: 'image/jpeg',
        }
      ],
      siteName: translate("site_name"),
    },
    twitter: {
      cardType: 'summary',
    },
    additionalLinkTags: [
      {
        rel: 'icon',
        href: '/Logofavicon.svg',
      },
    ],
  }
  console.log('Seo data', data);

  return (
    <NextSeo {...data} />
  )
}

export default Seo;
