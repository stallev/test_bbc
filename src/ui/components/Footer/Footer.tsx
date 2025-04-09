import { NavBarLinksNames, RoutePath } from '@/constants';
import { Locale } from '@/i18n.config';
import { CustomLink, Text } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';

import FooterNavBar from './FooterNavBar/FooterNavBar';
import ChurchContactsInfo from '../ContactsInfo/ChurchContactsInfo';
import styles from './styles/footer.module.scss';

interface FooterProps {
  translations: Record<string, string>;
  locale: Locale;
}

const Footer: React.FC<FooterProps> = ({ translations, locale }) => {
  return (
    <Container>
      <footer className={styles.footer}>
        <div className={styles.footer__top}>
          <ChurchContactsInfo locale={locale} />

          <FooterNavBar translations={translations} />
        </div>

        <div className={styles.footer__bottom}>
          <Text textType="p" className={styles.footer__copyright}>
            {`ⓒ Bible Baptist Church | 2000-${new Date().getFullYear()} | ${translations.copyright_text}`}
          </Text>

          <nav className={styles['footer__bottom-nav']}>
            <CustomLink
              to={RoutePath.Terms}
              label={translations[NavBarLinksNames.Terms]}
              className={styles['footer__bottom-nav-link']}
            />
            |
            <CustomLink
              to={RoutePath.PrivacyPolicy}
              label={translations[NavBarLinksNames.PrivacyPolicy]}
              className={styles['footer__bottom-nav-link']}
            />
          </nav>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
