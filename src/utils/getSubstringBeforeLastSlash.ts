export const getSubstringBeforeLastSlash = (str: string): string => {
  const lastIndex = str.lastIndexOf('/');

  if (lastIndex === -1) {
    return str;
  }

  return str.substring(0, lastIndex);
}
