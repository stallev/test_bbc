const SiteUrl = process.env.NEXT_PUBLIC_API_SITE_URL;

export const PostsQueryMaxCount = 10000;

export const EndpointsList = {
  PagesStandartRestEndpoint: `${SiteUrl}/wp-json/wp/v2/pages/`,
  MediaStandartRestEndpoint: `${SiteUrl}/wp-json/wp/v2/media/`,
  UpcomingEventsCustomRestEndpoint: `${SiteUrl}/wp-json/events/upcoming-events-list`,
  MinistersCustomRestEndpoint: `${SiteUrl}/wp-json/ministers/selected-ministers-list`,
  TimelineCustomRestEndpoint: `${SiteUrl}/wp-json/timeline/timeline-data`,
}

export const InnerApiEndponts = {
  GetInTouch: '/api/get-in-touch',
  SendParticipationInfo: '/api/send-participation-info',
}

export const ContactFormsEndpointsIndex = {
  getInTouch: 'getInTouch',
  sendParticipationInfo: 'sendParticipationInfo',
  prayerRequest: 'prayerRequest',
}

export const ContactFormsEndpoints = {
  getInTouch: 'https://u6gzu94upe.execute-api.us-east-1.amazonaws.com/default/ContactUsRequest',
  sendParticipationInfo: 'https://rp9hqa2oj1.execute-api.us-east-1.amazonaws.com/default/WorshipParticipationRequest',
  prayerRequest: 'https://2coz8t7e9k.execute-api.us-east-1.amazonaws.com/default/PrayerRequest',
}

export const SubscribeToEventsEndpoint = {
  dev: 'https://d7e55bt4k6.execute-api.us-east-1.amazonaws.com/default/SubscribeToUpcomingEventsNotifier',
}

export const WordpressGraphQLEndpoint = {
  dev: `${SiteUrl}/graphql`,
}
