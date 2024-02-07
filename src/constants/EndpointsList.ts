const SiteUrl = 'https://testchurchapi.stallevs.ru/';

export const PostsQueryMaxCount = 10000;

export const EndpointsList = {
  PagesStandartRestEndpoint: `${SiteUrl}wp-json/wp/v2/pages/`,
  MediaStandartRestEndpoint: `${SiteUrl}wp-json/wp/v2/media/`,
  UpcomingEventsCustomRestEndpoint: `${SiteUrl}wp-json/carbonfields/v1/upcoming_events_association`,
  MinistersCustomRestEndpoint: `${SiteUrl}wp-json/carbonfields/v1/selected-ministers-list`,
}

export const PrayerRequestEndpoint = {
  dev: 'https://2coz8t7e9k.execute-api.us-east-1.amazonaws.com/default/PrayerRequest',
}

export const ContactUsEndpoint = {
  dev: 'https://u6gzu94upe.execute-api.us-east-1.amazonaws.com/default/ContactUsRequest',
}

export const WordpressGraphQLEndpoint = {
  dev: 'https://testchurchapi.stallevs.ru/graphql',
}
