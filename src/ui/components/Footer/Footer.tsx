import FooterNavBar from './FooterNavBar/FooterNavBar';
import { ContactsInfo } from "@/constants/mock";
import { NavBarLinksNames, RoutePath } from '@/constants';
import { CustomLink, Text } from "@/ui/components/ui-kit";
import Container from '@/ui/containers/Container/Container';
import { Locale } from '@/i18n.config';

import styles from './styles/footer.module.scss';

interface FooterProps {
  translations: Record<string, string>
  locale: Locale
}

const Footer: React.FC<FooterProps> = ({ translations, locale }) => {
  const mapPageAddress = `https://www.google.com/maps/place/7635+Auburn+Blvd,+Citrus+Heights,+CA+95610,+USA/@38.7052374,-121.2915064,17z/data=!3m1!4b1!4m6!3m5!1s0x809adf969c69b087:0xa36c08994c591018!8m2!3d38.7052374!4d-121.2915064!16s%2Fg%2F11c43y__vr?hl=${locale}&entry=ttu`;

  return (
    <Container>
      <footer className={styles.footer}>
        <div className={styles.footer__top}>
          <div className={styles.footer__contacts}>
            <a
              href={mapPageAddress}
              target='_blank'
              className={styles["footer__address-link"]}
              tabIndex={0}
              aria-label='Google map location'
            >
              {ContactsInfo.address}
            </a>
            <a className={styles["footer__email-link"]} href={`mailto:${ContactsInfo.email}`}>{ContactsInfo.email}</a>
            <a className={styles["footer__phone-link"]} href={`tel:${ContactsInfo.phoneValue}`}>{ContactsInfo.phonePrint}</a>

            <Text
              textType="span"
              className={styles["footer__work-hours"]}
            >
              {ContactsInfo.workHours}
            </Text>
          </div>

          <FooterNavBar translations={translations} />
        </div>

        <div className={styles.footer__bottom}>
          <Text
            textType='p'
            className={styles.footer__copyright}
          >
            {`ⓒ Bible Baptist Church | 2000-${(new Date()).getFullYear()} | ${translations.copyright_text}`}
          </Text>

          <nav className={styles["footer__bottom-nav"]}>
            <CustomLink
              to={RoutePath.Terms}
              label={translations[NavBarLinksNames.Terms]}
              className={styles["footer__bottom-nav-link"]}
            />
            |
            <CustomLink
              to={RoutePath.PrivacyPolicy}
              label={translations[NavBarLinksNames.PrivacyPolicy]}
              className={styles["footer__bottom-nav-link"]}
            />
          </nav>
        </div>
      </footer>
    </Container>
  )
}

export default Footer
