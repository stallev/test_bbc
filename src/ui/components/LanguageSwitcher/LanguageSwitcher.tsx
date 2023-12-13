import { useRouter } from 'next/router';
import { MouseEventHandler } from 'react';

import styles from './styles/language-switcher.module.scss';

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();

  const availableLocale = router.locale == 'en' ? 'ru' : 'en';

  const handleLanguageChange: MouseEventHandler<HTMLDivElement> = () => {
    router.push(
      {
        pathname: router.pathname,
        query: router.query,
      },
      undefined,
      { locale: availableLocale }
    );
  };

  return (
    <div
      tabIndex={0}
      role="button"
      className={styles['language-switcher']}
      onClick={handleLanguageChange}
    >
      {availableLocale}
    </div>
  );
};

export default LanguageSwitcher;
