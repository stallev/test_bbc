export interface AboutUsPageDataProps {
  title: string;
  slug: string;
  timeline_data: TimelineDataItemProps[] | [];
  mission_data: OurMissionDataProps;
}

export interface TimelineDataItemProps {
  year_title: string;
  year_desc: string;
  year_additional_desc: string;
  images: Image[] | [];
}

export interface Image {
  id: string;
  url: string;
  alt: string;
}

export interface OurMissionDataProps {
  mission_title: string;
  mission_description: string;
  mission_goal: string;
}
