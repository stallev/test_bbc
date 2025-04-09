import React from 'react';

import { ContactsInfo } from '@/constants/mock';
import { Locale } from '@/i18n.config';

import { Text } from '../ui-kit';
import styles from './styles/church-contacts-info.module.scss';

interface ChurchContactsInfoProps {
  locale: Locale;
  isPageContentType?: boolean;
}

const ChurchContactsInfo = ({ locale, isPageContentType = false }: ChurchContactsInfoProps) => {
  const mapPageAddress = `https://www.google.com/maps/place/7635+Auburn+Blvd,+Citrus+Heights,+CA+95610,+USA/@38.7052374,-121.2915064,17z/data=!3m1!4b1!4m6!3m5!1s0x809adf969c69b087:0xa36c08994c591018!8m2!3d38.7052374!4d-121.2915064!16s%2Fg%2F11c43y__vr?hl=${locale}&entry=ttu`;

  return (
    <div
      className={`${styles['church-contacts-info']} ${isPageContentType ? styles['church-contacts-info--page-content'] : ''}`}
    >
      <a
        href={mapPageAddress}
        target="_blank"
        className={styles['church-contacts-info__address-link']}
        tabIndex={0}
        aria-label="Google map location"
        rel="noreferrer"
      >
        {ContactsInfo.address}
      </a>
      <a
        className={styles['church-contacts-info__email-link']}
        href={`mailto:${ContactsInfo.email}`}
      >
        {ContactsInfo.email}
      </a>
      <a
        className={styles['church-contacts-info__phone-link']}
        href={`tel:${ContactsInfo.phoneValue}`}
      >
        {ContactsInfo.phonePrint}
      </a>

      <Text textType="span" className={styles['church-contacts-info__work-hours']}>
        {ContactsInfo.workHours}
      </Text>
    </div>
  );
};

export default ChurchContactsInfo;
