'use client';

import Image from 'next/image';
import React from 'react';

import getImages from './getImages';
import styles from './styles/custom-image.module.scss';

interface CustomImageProps {
  className?: string;
  imageName?: string;
  imageURL?: string;
  onClick?: () => void;
  alt?: string;
  ariaLabel?: string;
  priority?: boolean;
  sizes?: string;
  placeholder?: string;
  blurDataURL?: string;
  quality?: number;
}

const CustomImage: React.FC<CustomImageProps> = ({
  className,
  imageName,
  imageURL,
  onClick,
  alt,
  ariaLabel = '',
  priority = false,
  sizes = '100vw',
  placeholder,
  blurDataURL,
  quality = 75,
}) => {
  console.log('priority', priority);
  console.log('imageName', imageName || imageURL);
  return (
    <div
      className={`${styles['custom-image']} ${className ? className : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      role={onClick ? 'button' : 'none'}
      tabIndex={onClick ? 1 : 0}
    >
      <Image
        src={imageURL || (imageName ? getImages[imageName] : '')}
        fill
        alt={alt || ''}
        priority={priority}
        sizes={sizes}
        placeholder={placeholder ? 'blur' : undefined}
        blurDataURL={blurDataURL && blurDataURL}
        quality={quality}
      />
    </div>
  );
};

export default CustomImage;
