import ClientUpcomingEvents from './ClientUpcomingEvents';
import { UpcomingEventsSectionProps } from './types';

const UpcomingEventsSection = async ({ locale, translations }: UpcomingEventsSectionProps) => {
  const UpcomingEventsDataApi = (await import('@/services/UpcomingDataApi')).default;
  const upcomingEventsData = await UpcomingEventsDataApi.getUpcomingEventsReduced(locale);

  return <ClientUpcomingEvents data={upcomingEventsData} translations={translations} />;
};

export default UpcomingEventsSection;
