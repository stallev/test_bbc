import dynamic from 'next/dynamic';
import React from 'react';

import { Text } from '@/ui/components/ui-kit';

import BibleQuotesList from '../BibleQuotesList/BibleQuotesList';
import { BibleQuotesListProps } from '../BibleQuotesList/types';
import styles from './styles/donation.module.scss';

const DonationForm = dynamic(
  () => import('@/ui/components/page-specific/giving/DonationForm/DonationForm')
);

export interface DonationProps {
  translations: Record<string, string>;
  isDonationPage: boolean;
}

const Donation = ({ translations, isDonationPage }: DonationProps) => {
  const donationBibleQuotesList: BibleQuotesListProps = {
    quotes: [
      {
        source: translations.donation_bible_text1_source,
        content: translations.donation_bible_text1_content,
      },
      {
        source: translations.donation_bible_text2_source,
        content: translations.donation_bible_text2_content,
      },
    ],
  };

  return (
    <div className={`${styles.donation} ${!isDonationPage ? styles['donation--section'] : ''}`}>
      <Text
        textType={isDonationPage ? 'h1' : 'h3'}
        className={isDonationPage ? styles.donation__title : styles['donation__sub-title']}
      >
        {translations.donation_block_title}
      </Text>

      <Text textType="p" className={styles.donation__question}>
        {translations.donation_reason_question}
      </Text>

      <div className={styles['donation__reasons-list']}>
        <Text textType="p" className={styles.donation__reason}>
          {translations.donation_reason_part1}
        </Text>

        <Text textType="p" className={styles.donation__reason}>
          {translations.donation_reason_part2}
        </Text>
      </div>

      <div className={styles['donation__main-content']}>
        <DonationForm />

        <BibleQuotesList quotes={donationBibleQuotesList.quotes} />
      </div>
    </div>
  );
};

export default Donation;
