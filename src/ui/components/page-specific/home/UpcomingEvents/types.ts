import { Locale } from '@/i18n.config';
import { UpcomingEventCardItemProps } from '../../upcoming-event/UpcomingEventCard/types';

export interface UpcomingEventListProps {
  data: UpcomingEventCardItemProps[];
  translations: Record<string, string>;
  isLandingPage?: boolean;
}
export interface UpcomingEventsSectionProps {
  locale: Locale;
  translations: Record<string, string>;
}
