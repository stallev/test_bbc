'use client';

import Text from '@/ui/components/ui-kit/Text';
import Container from '@/ui/containers/Container/Container';
import styles from './pastors.module.scss';

export default function PasstorsError() {
  return (
    <Container>
      <Text textType="h2" className={styles.error_title}>
        Sorry, Something went wrong!
      </Text>
      Please try again later.
    </Container>
  );
}
