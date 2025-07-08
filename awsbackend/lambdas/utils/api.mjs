import axios from 'axios';
import { pageFetchingHeaders } from '../constants/apiConstants.mjs';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const userAgents = [
  // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
  // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0',
  // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.10 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0',
];

export const fetchPage = async (path, userAgent) => {
  try {
    const headers = {
      ...pageFetchingHeaders,
      'User-Agent': userAgent,
    };
    const response = await axios.get(`${process.env.WebsiteUrl}${path}`, {
      headers,
    });
    console.log(`response fetching with UA ${userAgent} for path ${path}`, response);
  } catch (error) {
    console.log(`Fetch ${path} error with UA ${userAgent}`, error);
  }
};

export const revalidatePage = async path => {
  const enPath = `${process.env.WebsiteUrl}/api/revalidate?path=${path}&token=Reval234_DsToken`;
  const ruPath = `${process.env.WebsiteUrl}/api/revalidate?path=/ru${path !== '/' ? path : ''}&token=Reval234_DsToken`;
  console.log('en revalidated path', enPath);
  console.log('ru revalidated path', ruPath);

  try {
    const [enResponse, ruResponse] = await Promise.all([
      axios.get(enPath, { timeout: 5000 }),
      axios.get(ruPath, { timeout: 5000 }),
    ]);

    console.log('Revalidation results:', {
      en: enResponse.data,
      ru: ruResponse.data,
    });

    // if (!enResponse.data.revalidated || !ruResponse.data.revalidated) {
    //   throw new Error('Partial revalidation failed');
    // }
    // await fetchLocalePages(path);
  } catch (error) {
    console.error('Revalidation error:', error);
    throw new Error(`Failed to revalidate paths: ${enPath}, ${ruPath}`);
  }
};

export const fetchLocalePages = async path => {
  for (const ua of userAgents) {
    await fetchPage(path, ua);
    // await fetchPage(`/ru${path}`, ua);
    await delay(300 + Math.random() * 100);
  }
};
