import { StaffPersonCardDataProps } from "../StaffPersonCard/types";

export interface StaffListProps {
  data: StaffPersonCardDataProps[]
  translations: Record<string, string>
  isDetailed?: boolean
}
