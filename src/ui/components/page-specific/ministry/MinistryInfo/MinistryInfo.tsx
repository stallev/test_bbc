import React from 'react';

import { ConvertedGutenbergBlockType } from '@/types/WPDataTypes/GutenbergBlocksTypes';
import { MinistryImageData } from '@/types/WPDataTypes/MinistryWPDataTypes';
import Container from '@/ui/containers/Container/Container';

import MinistryDescription from '../MinistryDescription/MinistryDescription';
import MinistrySlider from '../MinistrySlider/MinistrySlider';
import styles from './styles/ministry-info.module.scss';

interface MininistryInfoProps {
  translations: Record<string, string>;
  data: {
    pageContent: ConvertedGutenbergBlockType[];
    ministryDays: string;
    ministryHours: string;
    ministryShortDescription: string;
    ministryImagesData: MinistryImageData[];
  };
}

const MinistryInfo = ({ data, translations }: MininistryInfoProps) => {
  return (
    <div className={styles['ministry-info']}>
      <MinistrySlider images={data.ministryImagesData} />

      <Container>
        <MinistryDescription
          translations={translations}
          ministryDays={data.ministryDays}
          ministryHours={data.ministryHours}
          ministryShortDescription={data.ministryShortDescription}
        />
      </Container>
    </div>
  );
};

export default MinistryInfo;
