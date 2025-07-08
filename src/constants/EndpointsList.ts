const SERVICE_ENDPOINT = process.env.SERVICE_API_ENDPOINT;
export const DOMAIN_NAME = SERVICE_ENDPOINT;

export const PostsQueryMaxCount = 10000;

export const EndpointsList = {
  AboutUsRestEndpoint: `${SERVICE_ENDPOINT}/api/word/page/`,

  MinistersCustomRestEndpoint: `${SERVICE_ENDPOINT}/api/ministers/selected-ministers-list`, // why not pull from the API

  UpcomingEventsCustomRestEndpoint: `${SERVICE_ENDPOINT}/api/word/upcoming/event/list`,
};

//TODO: move to our custom endpoint
export const ContactFormsEndpoints = {
  getInTouch: 'https://u6gzu94upe.execute-api.us-east-1.amazonaws.com/default/ContactUsRequest',
  sendParticipationInfo:
    'https://rp9hqa2oj1.execute-api.us-east-1.amazonaws.com/default/WorshipParticipationRequest',
  prayerRequest: 'https://2coz8t7e9k.execute-api.us-east-1.amazonaws.com/default/PrayerRequest',
} as const;

export type EndpointKeys = keyof typeof ContactFormsEndpoints;

export const SubscribeToEventsEndpoint = {
  dev: 'https://d7e55bt4k6.execute-api.us-east-1.amazonaws.com/default/SubscribeToUpcomingEventsNotifier',
};

export const WordpressGraphQLEndpoint = {
  dev: `${SERVICE_ENDPOINT}/graphql`,
};
