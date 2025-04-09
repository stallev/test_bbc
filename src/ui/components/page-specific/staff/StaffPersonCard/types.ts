import { ImageLinks } from '@/types/WPDataTypes/CommonWPDataTypes';

export interface StaffPersonCardDataProps {
  ministerFirstName: string;
  ministerLastName: string;
  ministerPosition: string;
  ministerDepartment: string;
  ministerDescription: string;
  excerpt: string;
  slug: string;
  imageLinks: ImageLinks;
}
export interface StaffPersonCardProps {
  data: StaffPersonCardDataProps;
  isDetailed?: boolean;
  translations: Record<string, string>;
  index?: number;
  isLandingPage?: boolean;
}
