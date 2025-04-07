import { Metadata } from "next";
import { DEFAULT_FEATURED_IMAGE } from "@/constants/mock";
import { getSubstringBeforeLastSlash } from "@/utils/getSubstringBeforeLastSlash";
import { getTranslations } from "@/utils/languageParser";
import { GetSeoDataProps } from "@/types/globalTypes";


export const getSeoData = ({ seoContentData, seoPathData}: GetSeoDataProps): Metadata => {
  const { asPath, locale, defaultLocale } = seoPathData;

  const translations = getTranslations(locale);
  const { data, isPostType } = seoContentData;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const normalizedPath = asPath !== '/' ? asPath : '';

  const ogImageUrl = !!data?.featuredImageUrl
    ? data.featuredImageUrl
    : DEFAULT_FEATURED_IMAGE;

  const imageFileExtension = ogImageUrl.substring(ogImageUrl.lastIndexOf('.') + 1);

  const getCanonicalUrl = () => {
    let canonicalUrl = '';
    if (!isPostType && locale == defaultLocale) {
      canonicalUrl = `${siteUrl}${normalizedPath}`;
    }
    if (!isPostType && locale !== defaultLocale) {
      canonicalUrl = `${siteUrl}/${locale}${normalizedPath}`;
    }
    if (isPostType && locale == defaultLocale) {
      canonicalUrl = `${siteUrl}${getSubstringBeforeLastSlash(normalizedPath)}/${data?.slug}`;
    }
    if (isPostType && locale !== defaultLocale) {
      canonicalUrl = `${siteUrl}/${locale}${getSubstringBeforeLastSlash(normalizedPath)}/${data.slug}`;
    }

    return canonicalUrl;
  }

  const getAlternateLangsUrls = () => {
    let alternateLangsUrls = {
      en: '',
      ru: '',
    };

    if (!isPostType) {
      alternateLangsUrls = {
        en: `${siteUrl}${normalizedPath}`,
        ru: `${siteUrl}/ru${normalizedPath}`,
      }
    }

    if (isPostType) {
      alternateLangsUrls = {
        en: `${siteUrl}${getSubstringBeforeLastSlash(normalizedPath)}/${data?.alternateLinksSlugs?.en}`,
        ru: `${siteUrl}/ru${getSubstringBeforeLastSlash(normalizedPath)}/${data?.alternateLinksSlugs?.ru}`,
      }
    }

    return alternateLangsUrls;
  }

  const canonicalUrl = getCanonicalUrl();
  const alternateLangsUrls = getAlternateLangsUrls();

  const ogLocale = `${locale}_${locale?.toUpperCase()}`
 
  return {
    title: data?.title,
    description: data?.metaDesc ? data?.metaDesc : translations.site_description,
    robots: "noindex, nofollow",
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLangsUrls,
    },
    openGraph: {
      url: canonicalUrl,
      title: data?.title,
      description: data?.metaDesc ? data?.metaDesc : translations.site_description,
      locale: ogLocale,
      images: [
        {
          url: ogImageUrl,
          width: 800,
          height: 600,
          alt: data?.title,
          type: `image/${imageFileExtension}`,
        }
      ],
      siteName: translations.site_name,
    },
    twitter: {
      title: data?.title,
      description: data?.metaDesc ? data?.metaDesc : translations.site_description,
      images: ogImageUrl,
    }
  }
}
