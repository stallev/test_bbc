import axios from 'axios';
import { pageFetchingHeaders } from '../constants/apiConstants.mjs';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPage = async path => {
  const response = await axios({
    method: 'post',
    url: `${process.env.WebsiteUrl}${path}`,
    headers: pageFetchingHeaders,
  });
  console.log('response fetching', response);
};

export const revalidatePage = async path => {
  const enPath = `${process.env.WebsiteUrl}/api/revalidate?path=${path}&token=Reval234_DsToken`;
  const ruPath = `${process.env.WebsiteUrl}/api/revalidate?path=/ru${path}&token=Reval234_DsToken`;

  try {
    const [enResponse, ruResponse] = await Promise.all([
      axios.get(enPath, { timeout: 5000 }),
      axios.get(ruPath, { timeout: 5000 }),
    ]);

    console.log('Revalidation results:', {
      en: enResponse,
      ru: ruResponse,
    });

    // if (!enResponse.data.revalidated || !ruResponse.data.revalidated) {
    //   throw new Error('Partial revalidation failed');
    // }
    await fetchLocalePages(path);
  } catch (error) {
    console.error('Revalidation error:', error);
    throw new Error(`Failed to revalidate paths: ${enPath}, ${ruPath}`);
  }
};

export const fetchLocalePages = async path => {
  const fetchingCount = 3;
  let iterator = 0;

  do {
    await delay(1000 + Math.random() * 5000);

    await fetchPage(path);
    await fetchPage(`/ru${path}`);
    iterator++;
  } while (iterator < fetchingCount);

  console.log('response fetching', response);
};
