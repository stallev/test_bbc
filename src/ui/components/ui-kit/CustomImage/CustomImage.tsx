'use client';

import cx from 'classnames';
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
}

const CustomImage: React.FC<CustomImageProps> = ({
  className,
  imageName,
  imageURL,
  onClick,
  alt,
  ariaLabel = '',
  priority,
  sizes = '100vw',
}) => {
  return (
    <div
      className={cx(styles['custom-image'], className)}
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
      />
    </div>
  );
};

export default CustomImage;
