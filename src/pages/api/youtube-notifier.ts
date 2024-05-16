// pages/api/youtube-notifier.ts
import type { NextApiRequest, NextApiResponse } from 'next';
var pubSubHubbub = require('pubsubhubbub');
import fetch from 'node-fetch';

const PUBLIC_URL = process.env.NEXT_PUBLIC_SITE_URL;

const callbackUrl = `${PUBLIC_URL}/api/youtube-notifier`;
const topic = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCefHFgsnLwBAL-w3YgxBCnw';
const hub = 'http://pubsubhubbub.appspot.com/';

const pubsub = pubSubHubbub.createServer({
  callbackUrl: callbackUrl,
  secret: 'your-secret-key',
});

pubsub.on('denied', (data: any) => {
  console.log('Denied:', data);
});

pubsub.on('subscribe', (data: any) => {
  console.log('Subscribed:', data);
});

pubsub.on('unsubscribe', (data: any) => {
  console.log('Unsubscribed:', data);
});

pubsub.on('error', (error: any) => {
  console.log('Error:', error);
});

pubsub.on('feed', async (data: any) => {
  console.log('Feed:', data);
  // Запуск процесса ревалидации
  await fetch(`${process.env.PUBLIC_URL}/api/revalidate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      path: '/media/live-streams',
      token: process.env.NEXT_PUBLIC_REVALIDATION_TOKEN,
    }),
  });
});

pubsub.listen(1337, () => {
  console.log('Server listening on port 1337');
  pubsub.subscribe(topic, hub);
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  pubsub.requestHandler(req, res);
}
