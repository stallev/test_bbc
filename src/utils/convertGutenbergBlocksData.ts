import { GutenbergBlocksTypes } from "@/constants";
import { S3_BUCKET_URL } from "@/constants";
import { getFileNameFromUrl } from ".";
import { stripHtmlTags } from ".";

export const convertGutenbergBlocksData = (blocks: any[]) => {
  return blocks
    .filter((item:any) => !!item.name)
    .sort((a:any, b:any) => a.order - b.order)
    .map((block:any) => {
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
            .filter((item:any) => item.name == 'core/image')
            .sort((a:any, b:any) => a.order - b.order)
            .map((imageItem:any) => {
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
        case 'core/quote':
          const citation = stripHtmlTags(block.originalContent);
          const originalContent = stripHtmlTags(block.innerBlocks[0].originalContent);

          return {
            type: GutenbergBlocksTypes.quote,
            text: originalContent,
            order: block.order,
            citation,
          }
        default:
          return {
            type: 'undefined',
          };
      }
    });
}
