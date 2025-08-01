import React from 'react';
import styles from '@/styles/pages/ministry.module.scss';
import Container from '@/ui/containers/Container/Container';

export default function Loading() {
  return (
    <Container>
      <div className={styles['ministry-loading']}>
        {/* Скелетон для заголовка */}
        <div className={styles['ministry-loading__title']}></div>

        {/* Скелетоны для изображений */}
        <div className={styles['ministry-loading__images']}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={styles['ministry-loading__image']}></div>
          ))}
        </div>

        {/* Скелетон для текста */}
        <div className={styles['ministry-loading__content']}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={styles['ministry-loading__text-line']}></div>
          ))}
        </div>
      </div>
    </Container>
  );
}
