export interface AboutUsPageDataProps {
  about_us_data: AboutUsData
  mission_data: OurMissionDataProps
}

export interface AboutUsData {
  timeline_data: TimelineDataItemProps[] | []
}

export interface TimelineDataItemProps {
  year_title: string
  year_descr: string
  year_additional_descr: string
  images: Image[] | []
}

export interface Image {
  id: string
  url: string
  alt: string
}

export interface OurMissionDataProps {
  mission_title: string
  mission_description: string
  mission_goal: string
}
