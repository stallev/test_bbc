export const stripHtmlTags = ( textWithTags: string) => textWithTags.replace(/<[^>]+>/g, '');
export const removeClasses = ( htmlString: string) => htmlString.replace(/\s*class="[^"]*"/g, '');
