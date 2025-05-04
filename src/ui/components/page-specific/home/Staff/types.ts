import { Locale } from '@/i18n.config';
import { StaffPersonCardDataProps } from '../../staff/StaffPersonCard/types';

export interface StaffSectionProps {
  data: StaffPersonCardDataProps[];
  translations: Record<string, string>;
}

export interface StaffSectionWrapProps {
  locale: Locale;
  translations: Record<string, string>;
}
