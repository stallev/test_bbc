export const stripHtmlTags = ( textWithTags: string) => textWithTags.replace(/<[^>]+>/g, '');
