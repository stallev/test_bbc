import React from 'react';

import { Text, CustomLink } from '@/ui/components/ui-kit';

import styles from './styles/media-page-header.module.scss';
import { MediaPagesTitles, MediaPageHeaderProps } from './types';

const MediaPageHeader = ({ isLivestreamPage, translations }: MediaPageHeaderProps) => {
  const renderTitle = (key: keyof typeof MediaPagesTitles, isActive: boolean) => {
    const { title, link } = MediaPagesTitles[key];
    return isActive ? (
      <Text textType="h1" className={styles['media-page-header__title']}>
        {translations[title]}
      </Text>
    ) : (
      <CustomLink
        to={link}
        label={translations[title]}
        className={styles['media-page-header__title-link']}
      />
    );
  };

  return (
    <div className={styles['media-page-header']}>
      {renderTitle('livestreams', isLivestreamPage)}
      {renderTitle('sermons', !isLivestreamPage)}
    </div>
  );
};

export default MediaPageHeader;
