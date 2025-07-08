'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AiOutlineGlobal } from 'react-icons/ai';
import { LANGUAGE_COOKIE_NAME, LANGUAGE_COOKIE_MAX_AGE } from '@/constants/generalAppConstants';
import { i18n } from '@/i18n.config';
import { Icon } from '@/ui/components/ui-kit';
import { getPathnameParams } from '@/utils/languageParser';
import styles from './styles/language-switcher.module.scss';

const LanguageSwitcher = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const { locale, pathnameWithoutLocale, isDefaultLocale } = getPathnameParams(pathname);
  const availableLocale = locale === i18n.defaultLocale ? 'ru' : i18n.defaultLocale;

  const newPathname = isDefaultLocale ? `/${availableLocale}${pathname}` : pathnameWithoutLocale;

  const availableLanguage = availableLocale === i18n.defaultLocale ? 'English' : 'Русский';

  const handleLanguageChange = () => {
    setIsLoading(true);
    document.cookie = `${LANGUAGE_COOKIE_NAME}=${availableLocale}; max-age=${LANGUAGE_COOKIE_MAX_AGE}; path=/`;
    console.log('newPathname', newPathname);
    router.push(newPathname);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <Link
      prefetch={true}
      href={newPathname}
      onClick={handleLanguageChange}
      className={styles['language-switcher']}
      style={{ pointerEvents: isLoading ? 'none' : 'auto', opacity: isLoading ? 0.5 : 1 }}
      title={availableLanguage}
    >
      {isLoading ? (
        <Icon iconName="animatedCircle" />
      ) : (
        <AiOutlineGlobal className={styles['language-switcher__icon']} />
      )}
      <span>{availableLanguage}</span>
    </Link>
  );
};

export default LanguageSwitcher;
