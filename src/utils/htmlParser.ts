import { JSDOM } from 'jsdom';

interface QuoteResult {
  quoteText: string;
  cite: string;
}

export const parseQuoteBlock = (html: string): QuoteResult => {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  const quoteElement = document.querySelector('blockquote p');
  const quoteText = quoteElement?.textContent || '';
  
  const citeElement = document.querySelector('blockquote cite');
  const cite = citeElement?.textContent || '';

  return {
    quoteText,
    cite
  };
}
