import { getPlaiceholder } from 'plaiceholder';
import { BACKEND_DOMAIN } from '@/constants/EndpointsList';
import { S3_BUCKET_NAME } from '@/constants/mock';

const cache = new Map<string, string>();

/**
 * Generates a Base64 blur placeholder for an image using Plaiceholder.
 * @param imageUrl - URL of the image to process.
 * @returns A Base64 string for the blurred image or a fallback placeholder on error.
 * @throws Error if the image URL is invalid or from an unauthorized domain.
 */
export const getBase64BlurData = async (imageUrl: string): Promise<string> => {
  if (!imageUrl.match(/^https?:\/\/.+\.(jpeg|jpg|png|webp)$/i)) {
    throw new Error('Invalid image URL');
  }

  const allowedDomains = [`${S3_BUCKET_NAME}.s3.amazonaws.com`, BACKEND_DOMAIN];
  const url = new URL(imageUrl);

  if (!allowedDomains.includes(url.hostname)) {
    throw new Error('Image URL from unauthorized domain');
  }

  if (cache.has(imageUrl)) {
    return cache.get(imageUrl)!;
  }

  try {
    const response = await fetch(imageUrl, {
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { base64 } = await getPlaiceholder(buffer, {
      size: 10,
    });

    cache.set(imageUrl, base64);
    return base64;
  } catch (error) {
    console.error(`Error generating blur data for ${imageUrl}:`, error);

    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';
  }
};
