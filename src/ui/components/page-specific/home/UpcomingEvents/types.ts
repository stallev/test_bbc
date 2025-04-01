import { UpcomingEventCardItemProps  } from "../../upcoming-event/UpcomingEventCard/types";

export interface UpcomingEventListProps {
  data: UpcomingEventCardItemProps[]
  translations: Record<string, string>
  isLandingPage?: boolean
}
