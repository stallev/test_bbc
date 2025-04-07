import { useTheme } from 'next-themes';
import { PiMoonStarsFill } from "react-icons/pi";
import { BsSun } from "react-icons/bs";

import styles from './styles/theme-switcher.module.scss';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const newThemeValue = theme === 'dark' ? 'light' : 'dark';

  const toggleTheme = () => {
    setTheme(newThemeValue);
    localStorage.setItem('theme', newThemeValue);
  }

  return (
    <div onClick={toggleTheme} className={styles["theme-switcher"]}>
      {newThemeValue === 'dark' ? <PiMoonStarsFill /> : <BsSun />}
    </div>
  )
}

export default ThemeSwitcher
