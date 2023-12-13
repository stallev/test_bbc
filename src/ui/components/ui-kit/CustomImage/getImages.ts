import { StaticImageData } from 'next/image';

import logoHeader from '../../../assets/images/logo_modified.png';
import greetingSreenImage from '../../../assets/images/bg-header-3.webp';

interface Images {
  [key: string]: StaticImageData;
}

const getImages: Images = {
  logoHeader,
  greetingSreenImage,
};

export default getImages;
