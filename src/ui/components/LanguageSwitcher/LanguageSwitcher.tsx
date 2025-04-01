import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AiOutlineGlobal } from "react-icons/ai";
import { getPathnameParams } from '@/utils/languageParser';
import { i18n } from '@/i18n.config';

import styles from './styles/language-switcher.module.scss';


const LanguageSwitcher: React.FC = () => {
  const pathname = usePathname();
  
  const { locale, pathnameWithoutLocale, isDefaultLocale } = getPathnameParams(pathname);
  const availableLocale = locale === i18n.defaultLocale ? 'ru' : i18n.defaultLocale;
  
  const newPathname = isDefaultLocale ? `/${availableLocale}${pathname}` : pathnameWithoutLocale;
  return (
    <Link
      prefetch={true}
      href={newPathname}
      className={styles['language-switcher']}
    >
      <AiOutlineGlobal className={styles['language-switcher__icon']} />

      <span>{availableLocale}</span>
    </Link>
  );
};

export default LanguageSwitcher;
