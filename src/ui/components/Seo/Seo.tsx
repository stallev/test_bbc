import React from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { DEFAULT_FEATURED_IMAGE } from '@/constants/mock';
import { getSubstringBeforeLastSlash } from '@/utils/getSubstringBeforeLastSlash';
import useTranslationFunction from '@/hooks/useTranslationFunction';

import { SeoProps } from './types';

 const Seo:React.FC<SeoProps> = ({
  seoValues,
 }) => {
  const {asPath, locale, defaultLocale} = useRouter();

  const translate = useTranslationFunction();
  const {data, isPostType} = seoValues;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const normalizedPath = asPath !== '/' ? asPath : '';

  const ogImageUrl = !!data?.featuredImageUrl
    ? data.featuredImageUrl
    : DEFAULT_FEATURED_IMAGE;

  const getCanonicalUrl = () => {
    let canonicalUrl = '';
    if(!isPostType && locale == defaultLocale) {
      canonicalUrl = `${siteUrl}${normalizedPath}`;
    }
    if(!isPostType && locale !== defaultLocale) {
      canonicalUrl = `${siteUrl}/${locale}${normalizedPath}`;
    }
    if(isPostType && locale == defaultLocale) {
      canonicalUrl = `${siteUrl}${getSubstringBeforeLastSlash(normalizedPath)}/${data.slug}`;
    }
    if(isPostType && locale !== defaultLocale) {
      canonicalUrl = `${siteUrl}/${locale}${getSubstringBeforeLastSlash(normalizedPath)}/${data.slug}`;
    }

    return canonicalUrl;
  }

  const getAlternateLangsUrls = () => {
    let alternateLangsUrls = {
      en: '',
      ru: '',
    };
    
    if(!isPostType) {
      alternateLangsUrls = {
        en: `${siteUrl}${normalizedPath}`,
        ru: `${siteUrl}/ru${normalizedPath}`,
      }
    }

    if(isPostType) {
      alternateLangsUrls = {
        en: `${siteUrl}${getSubstringBeforeLastSlash(normalizedPath)}/${data.alternateLinksSlugs?.en}`,
        ru: `${siteUrl}/ru${getSubstringBeforeLastSlash(normalizedPath)}/${data.alternateLinksSlugs?.ru}`,
      }
    }

    return alternateLangsUrls;
  }

  const canonicalUrl = getCanonicalUrl();
  const alternateLangsUrls = getAlternateLangsUrls();
  
  const ogLocale = `${locale}_${locale?.toUpperCase()}`

  const seoData = {
    title: data.title,
    titleTemplate: `%s | ${translate("site_name")}`,
    description: data.metaDesc,
    canonical: canonicalUrl,
    openGraph: {
      url: canonicalUrl,
      title: data.title,
      description: data.metaDesc ? data.metaDesc : translate("site_description"),
      locale: ogLocale,
      images: [
        {
          url: ogImageUrl,
          width: 800,
          height: 600,
          alt: data.title,
          type: 'image/jpeg',
        }
      ],
      siteName: translate("site_name"),
    },
    twitter: {
      cardType: 'summary_large_image',
      image: ogImageUrl,
    },
    additionalLinkTags: [
      {
        rel: 'icon',
        href: '/Logofavicon.svg',
      },
      {
        rel: 'alternate',
        hrefLang: 'x-default',
        href: alternateLangsUrls.en,
      },
    ],
    additionalMetaTags: [
      {
        name: 'twitter:name',
        content: data.title
      },
      {
        name: 'twitter:image',
        content: ogImageUrl
      },
      {
        name: 'twitter:description',
        content: data.metaDesc ? data.metaDesc : translate("site_description"),
      },
    ],
    languageAlternates: [
      {
        hrefLang: 'en',
        href: alternateLangsUrls.en,
      },
      {
        hrefLang: 'ru',
        href: alternateLangsUrls.ru,
      },
    ],
  }

  return <NextSeo {...seoData} />
}

export default Seo;
