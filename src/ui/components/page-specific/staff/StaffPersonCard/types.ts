export interface StaffPersonCardDataProps {
  path?: string;
  title?: string;
  position?: string;
  excerpt?: string;
  photo?: string;
}

export interface StaffPersonCardProps {
  data: StaffPersonCardDataProps;
  isDetailed?: boolean;
  translations: Record<string, string>;
  index?: number;
  isLandingPage?: boolean;
}
