import { JSDOM } from 'jsdom';
import { GutenbergBlocksTypes } from '@/constants';
import { HtmlBlockAttributes, ParsedHTMLBlock } from '@/types/postTypes';
import { removeClasses } from '@/utils/stripHtmlTags';

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
    cite,
  };
};

export function parseBlocks(htmlString: string): ParsedHTMLBlock[] {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  const blocks = Array.from(
    document.querySelectorAll(
      '[class^="wp-block-"], p, h1, h2, h3, h4, h5, h6, ul, ol, blockquote, figure, pre, hr, li, cite'
    )
  );

  const topLevelBlocks = blocks.filter(block => {
    let parent = block.parentElement;
    while (parent) {
      if (blocks.includes(parent)) {
        return false;
      }
      parent = parent.parentElement;
    }
    return true;
  });

  const result: ParsedHTMLBlock[] = [];
  let order = 0;

  topLevelBlocks.forEach(block => {
    const blockData = processBlock(block, order++);
    if (
      (blockData && blockData.filtered !== '') ||
      blockData?.name === GutenbergBlocksTypes.image ||
      blockData?.name === GutenbergBlocksTypes.separator
    ) {
      result.push(blockData);
    }
  });

  return result;
}

function processBlock(element: Element, order: number): ParsedHTMLBlock | null {
  const tagName = element.tagName.toLowerCase();
  let name: string;
  let content: string;
  let filtered: string;
  const attributes: HtmlBlockAttributes = {};
  const children: ParsedHTMLBlock[] = [];

  switch (tagName) {
    case 'p':
      name = GutenbergBlocksTypes.paragraph;
      content = removeClasses(element.outerHTML);
      filtered = element.textContent?.trim() || '';
      break;

    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      name = GutenbergBlocksTypes.heading;
      content = removeClasses(element.outerHTML);
      filtered = element.textContent?.trim() || '';
      attributes.headingType = parseInt(tagName[1]);
      break;

    case 'ul':
    case 'ol':
      name = GutenbergBlocksTypes.list;
      content = removeClasses(element.outerHTML);
      filtered = element.textContent?.trim() || '';
      attributes.listType = tagName === 'ul' ? 'ul' : 'ol';
      Array.from(element.children).forEach((child, index) => {
        const childBlock = processBlock(child, index);
        if (childBlock) children.push(childBlock);
      });
      break;

    case 'li':
      name = GutenbergBlocksTypes.listItem;
      content = removeClasses(element.outerHTML);
      filtered = element.textContent?.trim() || '';
      break;

    case 'blockquote':
      name = GutenbergBlocksTypes.quote;
      content = removeClasses(element.outerHTML);
      const quoteP = element.querySelector('p');
      attributes.quoteText = quoteP?.textContent?.trim() || '';
      attributes.cite = element.querySelector('cite')?.textContent?.trim() || '';
      filtered = quoteP?.textContent?.trim() || '';
      Array.from(element.children).forEach((child, index) => {
        const childBlock = processBlock(child, index);
        if (childBlock) children.push(childBlock);
      });
      break;

    case 'figure':
      name = GutenbergBlocksTypes.image;
      const img = element.querySelector('img');
      const caption = element.querySelector('figcaption');
      content = removeClasses(element.outerHTML);
      filtered = '';
      attributes.url = img?.getAttribute('src') || '';
      attributes.caption = caption?.textContent?.trim() || '';
      break;

    case 'pre':
      if (element.classList.contains('wp-block-code')) {
        name = GutenbergBlocksTypes.code;
        content = removeClasses(element.outerHTML);
        filtered = element.textContent?.trim() || '';
      } else if (element.classList.contains('wp-block-preformatted')) {
        name = GutenbergBlocksTypes.preformatted;
        content = removeClasses(element.outerHTML);
        filtered = element.textContent?.trim() || '';
      } else if (element.classList.contains('wp-block-verse')) {
        name = GutenbergBlocksTypes.verse;
        content = removeClasses(element.outerHTML);
        filtered = element.textContent?.trim() || '';
      } else {
        return null;
      }
      break;

    case 'hr':
      name = GutenbergBlocksTypes.separator;
      content = '';
      filtered = '';
      break;

    default:
      return null;
  }

  return {
    name,
    content,
    filtered,
    attributes,
    order,
    children,
  };
}
