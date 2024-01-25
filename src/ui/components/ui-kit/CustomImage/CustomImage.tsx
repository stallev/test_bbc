import React from 'react';
import cx from 'classnames';
import Image from 'next/image';
import getImages from './getImages';

import styles from './styles/custom-image.module.scss';

enum PlaceholderValue {
  'empty' = 'empty',
  'blur' = 'blur'
}

interface CustomImageProps {
  className?: string, 
  imageName?: string, 
  imageURL?: string, 
  onClick?: () => void,
  alt?: string, 
  ariaLabel?: string,
  priority?: boolean,
  sizes?: string,
  placeholder?: string
  blurDataURL?: string
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
  placeholder = 'empty',
  blurDataURL,
}) => {
  return (
    <div
      className={cx(
        styles['custom-image'],
        className,
      )}
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
        placeholder={placeholder as PlaceholderValue}
        blurDataURL={blurDataURL || ''}
      />
    </div>
  );
};

export default CustomImage;