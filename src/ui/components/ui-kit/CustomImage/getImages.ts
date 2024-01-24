import { StaticImageData } from 'next/image';

import logoHeader from '../../../assets/images/Logo + text 2.svg';
import greetingSreenImage from '../../../assets/images/bg-header-3.webp';

interface Images {
  [key: string]: StaticImageData;
}

const getImages: Images = {
  logoHeader,
  greetingSreenImage,
};

export default getImages;
