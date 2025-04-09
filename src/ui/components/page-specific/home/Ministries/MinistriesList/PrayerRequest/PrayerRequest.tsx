import React from 'react';

import { ContactFormsEndpointsTypes } from '@/types/formTypes';
import BibleQuotesList from '@/ui/components/BibleQuotesList/BibleQuotesList';
import { BibleQuotesListProps } from '@/ui/components/BibleQuotesList/types';
import ContactUsForm from '@/ui/components/ContactUsForm/ContactUsForm';
import { Icon, Text } from '@/ui/components/ui-kit';

import styles from './styles/prayer-request.module.scss';

interface PrayerRequestProps {
  translations: Record<string, string>;
}

const PrayerRequest = ({ translations }: PrayerRequestProps) => {
  const prayerBibleQuotesList: BibleQuotesListProps = {
    quotes: [
      {
        source: translations.prayer_bible_text1_source,
        content: translations.prayer_bible_text1_content,
      },
      {
        source: translations.prayer_bible_text2_source,
        content: translations.prayer_bible_text2_content,
      },
    ],
  };

  return (
    <div className={styles['prayer-request']}>
      <Text textType="p" className={styles['prayer-request__goal-text']}>
        {translations.prayer_text_goal}
      </Text>
      <Text textType="h1" className={styles['prayer-request__title']}>
        {translations.prayer_title}
      </Text>

      <div className={styles['prayer-request__quotes']}>
        <Icon iconName="prayer" />

        <BibleQuotesList quotes={prayerBibleQuotesList.quotes} />
      </div>

      <div className={styles['prayer-request__action']}>
        <Text textType="p" className={styles['prayer-request__motivation']}>
          {translations.prayer_motivation}
        </Text>

        <ContactUsForm
          ContactFormType={ContactFormsEndpointsTypes.prayerRequest}
          isContactWillingFieldExist={true}
        />
      </div>
    </div>
  );
};

export default PrayerRequest;
