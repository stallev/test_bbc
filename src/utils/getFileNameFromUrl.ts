export const getFileNameFromUrl = (url: string): string | null => {
  const parts = url.split('/');
  const fileName = parts[parts.length - 1];
  return fileName ? fileName : null;
};
