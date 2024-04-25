import { SeoContentDataProps } from "@/ui/components/Seo/types";
import { DEFAULT_FEATURED_IMAGE } from "@/constants/mock";

export const getPostSeoData = (data: any, locale: string) => {
  const featuredImageUrl = !!data.featuredImage ? data.featuredImage.node.mediaItemUrl : DEFAULT_FEATURED_IMAGE;
  const otherLanguageCode = data.translations[0].language.code.toLowerCase();
  const otherTranslationSlug = data.translations[0].slug;

  const seo: SeoContentDataProps = {
    data: {
      ...data.seo,
      featuredImageUrl,
      title: data.title,
      slug: data.slug,
      alternateLinksSlugs: {
        [locale]: data.slug,
        [otherLanguageCode]: otherTranslationSlug,
      }
    },
    isPostType: true,
  }

  return seo;
};
