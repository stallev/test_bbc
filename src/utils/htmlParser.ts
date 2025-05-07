import { parse as parseHtml } from 'node-html-parser';

interface QuoteResult {
  quoteText: string;
  cite: string;
}

export const parseQuoteBlock = (html: string): QuoteResult => {
  const root = parseHtml(html);
  const quoteElement = root.querySelector('blockquote p');
  const quoteText = quoteElement?.textContent || '';

  const citeElement = root.querySelector('blockquote cite');
  const cite = citeElement?.textContent || '';

  return {
    quoteText,
    cite,
  };
};
