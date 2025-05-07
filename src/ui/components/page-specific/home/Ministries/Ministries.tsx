import React from 'react';

import { Text } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';

import MinistriesList from './MinistriesList/MinistriesList';
import styles from './styles/ministries.module.scss';

export interface MinistriesProps {
  translations: Record<string, string>;
}

const Ministries = ({ translations }: MinistriesProps) => {
  return (
    <Container>
      <section className={styles.ministries}>
        <Text textType="h2" className={styles.ministries__title}>
          {translations.ministries_section_title}
        </Text>

        <MinistriesList translations={translations} />
      </section>
    </Container>
  );
};

export default Ministries;
