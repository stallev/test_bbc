import ClientUpcomingEvents from './ClientUpcomingEvents';
import { UpcomingEventsSectionProps } from './types';

const UpcomingEventsSection = async ({ locale, translations }: UpcomingEventsSectionProps) => {
  return <ClientUpcomingEvents locale={locale} translations={translations} />;
};

export default UpcomingEventsSection;
