import { useRouter, usePathname } from 'next/navigation';
import { MouseEventHandler } from 'react';
import { AiOutlineGlobal } from "react-icons/ai";
import { getPathnameParams } from '@/utils/languageParser';

import styles from './styles/language-switcher.module.scss';


const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const { locale, pathnameWithoutLocale, isDefaultLocale } = getPathnameParams(pathname);
  const availableLocale = locale === 'en' ? 'ru' : 'en';
  
  const newPathname = isDefaultLocale ? `/${availableLocale}${pathname}` : pathnameWithoutLocale;

  const handleLanguageChange: MouseEventHandler<HTMLDivElement> = () => {
    router.push(newPathname);
  };

  return (
    <div
      tabIndex={0}
      role="button"
      className={styles['language-switcher']}
      onClick={handleLanguageChange}
    >
      <AiOutlineGlobal className={styles['language-switcher__icon']} />
      
      {availableLocale}
    </div>
  );
};

export default LanguageSwitcher;
