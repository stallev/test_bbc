import { RoutePath } from '@/constants';
import { getTranslations } from '@/utils/languageParser';

type TranslationKeys = keyof ReturnType<typeof getTranslations>;

export const MediaPagesTitles = {
  livestreams: {
    title: 'live_streams_nav_link_text' as TranslationKeys,
    link: RoutePath.LiveStreams,
  },
  sermons: {
    title: 'sermons_nav_link_text' as TranslationKeys,
    link: RoutePath.Sermons,
  },
};

export interface MediaPageHeaderProps {
  isLivestreamPage: boolean;
  translations: Record<string, string>;
}
