import { EndpointsList } from "@/constants";
import { getTimelineEventData, getTimelineEventsSlugs, getTimelineEventDataBySlug } from "@/graphql/timelineEventsQueries";
import { fetchAPI } from "./WordPressFetchAPI";

class TimelineEventDataApi {
  static async getTimelineEventsItemsIDs() {
    const response = await fetch(EndpointsList.TimelineCustomRestEndpoint);
    const data = await response.json();

    return data;
  }

  static async getTimelineEventItemData(id: string, locale: string, idType = 'DATABASE_ID') {
    const variables = {
      id,
      language: locale.toUpperCase(), 
      idType,
    }
    
    const { timelineEvent: { translation } } = await fetchAPI(getTimelineEventData, { variables });

    return translation;
  }

  static async getTimelineEventItemDataBySlug(slug: string, locale: string) {
    const variables = {
      slug,
      language: locale.toUpperCase(),
    }
    
    const { timelineEventBy: { translation } } = await fetchAPI(getTimelineEventDataBySlug, { variables });
    
    return translation;
  }

  static async getTimelineEvents(locale: string) {    
    interface EventsListData {
      year: string
      eventsList: any[]
    }
    const res = await this.getTimelineEventsItemsIDs();
    const resultItems: EventsListData[] = [];

    for (const yearData of res) {
      let eventsListData: EventsListData = {
        year: yearData?.year,
        eventsList: [],
      };

      for (const event of yearData.events) {
        const eventData = await this.getTimelineEventItemData(event.id, locale.toUpperCase());
        eventsListData.eventsList.push(eventData);
      }
      
      resultItems.push(eventsListData);
    }
    
    return resultItems;
  }


  static async getTimelineEventsPaths() {
    const { allTimelineEvent: { edges: nodes } } = await fetchAPI(getTimelineEventsSlugs);

    const paths = nodes.map(({ node }: any) => {
      return {
        params: {
          postSlug: node.slug
        }
      };
    })
        
    return paths;
  }
}

export default TimelineEventDataApi;
