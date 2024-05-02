import { useRouter } from 'next/router';
import Logo from '../Logo/Logo';
import { PiMapPinFill } from "react-icons/pi";

import styles from './styles/footer.module.scss';
import FooterNavBar from './FooterNavBar/FooterNavBar';

const Footer:React.FC = () => {
  const { locale } = useRouter();
  const mapPageAddress = `https://www.google.com/maps/place/7635+Auburn+Blvd,+Citrus+Heights,+CA+95610,+USA/@38.7052374,-121.2915064,17z/data=!3m1!4b1!4m6!3m5!1s0x809adf969c69b087:0xa36c08994c591018!8m2!3d38.7052374!4d-121.2915064!16s%2Fg%2F11c43y__vr?hl=${locale}&entry=ttu`;
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <div className={styles.footer__logo}>
          <Logo />
        </div>

        {/* <a
          href={mapPageAddress}
          target='_blank'
          className={styles["footer__address-link"]}
          tabIndex={0}
          aria-label='Google map location'
        >
          <PiMapPinFill />
          <span>7635 Auburn Blvd, Citrus Heights, CA 95610</span>
        </a> */}
      </div>
      
      <div className={styles.footer__bottom}>
        <FooterNavBar />
      </div>
    </footer>
  )
}

export default Footer
