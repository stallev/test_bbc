import { NextApiRequest, NextApiResponse } from 'next';

import { ContactFormsEndpoints } from '@/constants/EndpointsList';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { url, data } = req.body;

  const endpointUrl = ContactFormsEndpoints[url as keyof typeof ContactFormsEndpoints];

  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error submitting form: ${response.statusText}`);
    }

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting form...' });
  }
}
