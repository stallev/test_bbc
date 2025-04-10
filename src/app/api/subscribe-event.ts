import { NextApiRequest, NextApiResponse } from 'next';

import { SubscribeToEventsEndpoint } from '@/constants/EndpointsList';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data = req.body;

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

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting form...' });
  }
}
