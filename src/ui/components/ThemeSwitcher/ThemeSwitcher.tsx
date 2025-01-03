"use client"

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { PiMoonStarsFill } from "react-icons/pi";
import { BsSun } from "react-icons/bs";

import styles from './styles/theme-switcher.module.scss';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const newThemeValue = theme === 'dark' ? 'light' : 'dark';

  const toggleTheme = () => {
    setTheme(newThemeValue);
    localStorage.setItem('theme', newThemeValue);
  }

  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted) {
    return null;
  }

  return (
    <div onClick={toggleTheme} className={styles["theme-switcher"]}>
      {newThemeValue === 'dark' ? <PiMoonStarsFill /> : <BsSun />}
      <span>{theme}</span>
    </div>
  )
}

export default ThemeSwitcher
