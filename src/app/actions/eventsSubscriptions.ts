"use server"

import { SubscribeToEventsEndpoint } from "@/constants/EndpointsList";
import { eventSubscriptionInputDataType } from "@/types/formTypes";

export const subscribeToEventsAction = async (data: eventSubscriptionInputDataType): Promise<string> => {
  try {
    const response = await fetch(SubscribeToEventsEndpoint.dev, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const textResponse = await response.text();
    const responseData = JSON.parse(textResponse);

    if (!response.ok) {
      throw new Error(`Error submitting form: ${response.statusText}`);
    }
    
    return  JSON.stringify({
      status: 200,
      responseData,
    });
  } catch (error) {
    console.error(error);
    
    return JSON.stringify({
      status: 500,
      responseData: 'Error submitting form...',
    });
  }
}
