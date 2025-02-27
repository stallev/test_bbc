import { GutenbergBlocksTypes } from "@/constants";
import { S3_BUCKET_URL } from "@/constants";
import { getFileNameFromUrl } from ".";
import { stripHtmlTags } from ".";
import { parseQuoteBlock } from "./htmlParser";
import { GutenbergBlockType, InnerBlock } from "@/types/WPDataTypes/PageContentDataTypes";

export const convertGutenbergBlocksData = (blocks: GutenbergBlockType[]) => {
  return blocks
    .filter((item:GutenbergBlockType) => !!item.name)
    .sort((a:GutenbergBlockType, b:GutenbergBlockType) => a.order - b.order)
    .map((block:GutenbergBlockType) => {
      switch(block.name) {
        case 'core/paragraph':
          return {
            type: GutenbergBlocksTypes.paragraph,
            order: block.order,
            content: stripHtmlTags(block.saveContent),
          }
        case 'core/image':
          return {
            type: GutenbergBlocksTypes.image,
            order: block.order,
            src: block.mediaItem.node.mediaItemUrl,
          }
        case 'core/heading':
          return {
            type: GutenbergBlocksTypes.heading,
            headingType: 'h' + block.attributes.level,
            order: block.order,
            content: stripHtmlTags(block.saveContent),
          }
        case 'core/gallery':
          const galleryList = block.innerBlocks
            .filter((item: InnerBlock) => item.name == 'core/image')
            .sort((a: InnerBlock, b: InnerBlock) => a.order - b.order)
            .map((imageItem: InnerBlock) => {
              return {
                type: GutenbergBlocksTypes.image,
                order: imageItem.order,
                src: imageItem.mediaItem.node.mediaItemUrl,
                caption: imageItem.mediaItem.node?.caption ? imageItem.mediaItem.node?.caption : "",
              }
            })
          return {
            type: GutenbergBlocksTypes.gallery,
            order: block.order,
            content: galleryList,
          }
        case 'core/file':
          const file = getFileNameFromUrl(block.attributes.href);
          return {
            type: GutenbergBlocksTypes.file,
            src: S3_BUCKET_URL + file,
            order: block.order,
            label: file,
          }
        case 'core/audio':
          const audioFile = getFileNameFromUrl(block.attributes.src);
          return {
            type: GutenbergBlocksTypes.audio,
            src: S3_BUCKET_URL + audioFile,
            order: block.order,
            caption: !!block.attributes?.caption.length ? block.attributes.caption : "",
          }
        case 'core/video':
          const videoFile = getFileNameFromUrl(block.attributes.src);

          return {
            type: GutenbergBlocksTypes.video,
            src: S3_BUCKET_URL + videoFile,
            order: block.order,
          }
        case 'core/pullquote':
          const quoteContent =  parseQuoteBlock(block?.originalContent);
          
          return {
            type: GutenbergBlocksTypes.quote,
            text: quoteContent.quoteText,
            order: block.order,
            citation: quoteContent.cite,
          }
        default:
          return {
            type: 'undefined',
          };
      }
    });
}
