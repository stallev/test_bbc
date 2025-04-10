'use client';

import { LinkTypes, RoutePath } from '@/constants';
import { useClientTranslationFunction } from '@/hooks/useLocale';
import Header from '@/ui/components/Header/Header';
import { Text, CustomLink, Icon } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import Providers from '@/ui/containers/Providers/Providers';

import styles from '../styles/pages/not-found.module.scss';

export default function NotFound() {
  const translate = useClientTranslationFunction();

  return (
    <>
      <Providers>
        <Header />
        <Container>
          <main className={styles['not-found']}>
            <div className={styles['not-found__title-wrap']}>
              <h1 className={styles['not-found__title']}>404</h1>
              <Text textType="span" className={styles['not-found__title-error-text']}>
                {translate('general_error_text')}
              </Text>
            </div>

            <Text textType="p" className={styles['not-found__description']}>
              {translate('not_found_error_description_page_text')}
            </Text>

            <CustomLink
              to={RoutePath.Home}
              className={styles['not-found__back-to-homepage-link']}
              type={LinkTypes.secondary}
            >
              <Text textType="span">{translate('back_home_nav_link_text')}</Text>

              <Icon iconName="rightArrow" />
            </CustomLink>
          </main>
        </Container>
      </Providers>
    </>
  );
}
