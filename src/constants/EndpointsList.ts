const SiteUrl = process.env.NEXT_PUBLIC_API_SITE_URL;

export const PostsQueryMaxCount = 10000;

export const EndpointsList = {
  PagesStandartRestEndpoint: `${SiteUrl}/wp-json/wp/v2/pages/`,
  MediaStandartRestEndpoint: `${SiteUrl}/wp-json/wp/v2/media/`,
  UpcomingEventsCustomRestEndpoint: `${SiteUrl}/wp-json/events/upcoming-events-list`,
  MinistersCustomRestEndpoint: `${SiteUrl}/wp-json/ministers/selected-ministers-list`,
  TimelineCustomRestEndpoint: `${SiteUrl}/wp-json/timeline/timeline-data`,
}

export const PrayerRequestEndpoint = {
  dev: 'https://2coz8t7e9k.execute-api.us-east-1.amazonaws.com/default/PrayerRequest',
}

export const ContactUsEndpoint = {
  dev: 'https://u6gzu94upe.execute-api.us-east-1.amazonaws.com/default/ContactUsRequest',
}

export const WorshipParticipationRequestEndpoint = {
  dev: 'https://rp9hqa2oj1.execute-api.us-east-1.amazonaws.com/default/WorshipParticipationRequest',
}

export const SubscribeToEventsEndpoint = {
  dev: 'https://d7e55bt4k6.execute-api.us-east-1.amazonaws.com/default/SubscribeToUpcomingEventsNotifier',
}

export const WordpressGraphQLEndpoint = {
  dev: `${SiteUrl}/graphql`,
}
