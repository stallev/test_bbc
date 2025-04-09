'use server';

import { ContactFormsEndpoints } from '@/constants/EndpointsList';
import { ContactFormsEndpointsTypes, ContactFormActionInputTypes } from '@/types/formTypes';

type ResponseType = {
  status: number;
  message?: string;
};

// Определяем тип для ключей ContactFormsEndpointsTypes
type EndpointKeys = keyof typeof ContactFormsEndpoints;

export const contactRequestAction = async ({
  data,
  contactType,
}: ContactFormActionInputTypes): Promise<string> => {
  const endpointType = ContactFormsEndpointsTypes[contactType] as EndpointKeys;
  const url = ContactFormsEndpoints[endpointType];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse: ResponseType = {
        status: response.status,
        message: response.statusText || 'Failed to submit form',
      };
      return JSON.stringify(errorResponse);
    }

    const successResponse: ResponseType = {
      status: 200,
      message: 'Form submitted successfully',
    };

    return JSON.stringify(successResponse);
  } catch (error: unknown) {
    console.error('Contact form submission error:', error);

    const errorResponse: ResponseType = {
      status: 500,
      message: error instanceof Error ? error.message : 'Internal server error',
    };
    return JSON.stringify(errorResponse);
  }
};
