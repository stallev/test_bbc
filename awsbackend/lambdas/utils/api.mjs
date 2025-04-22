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
