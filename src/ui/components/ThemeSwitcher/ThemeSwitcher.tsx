'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Icon from '@/ui/components/ui-kit/Icon';

import styles from './styles/theme-switcher.module.scss';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const newThemeValue = theme === 'dark' ? 'light' : 'dark';

  const toggleTheme = () => {
    setTheme(newThemeValue);
    localStorage.setItem('theme', newThemeValue);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div onClick={toggleTheme} aria-label="Theme switcher" className={styles['theme-switcher']}>
      {newThemeValue === 'dark' ? <Icon iconName="darkTheme" /> : <Icon iconName="lightTheme" />}
    </div>
  );
};

export default ThemeSwitcher;
