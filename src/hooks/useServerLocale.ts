import { usePathname } from 'next/navigation'
import { getPathnameParams } from '@/utils/languageParser';


export const useServerLocale = () => {
  const pathname = usePathname();
  
  const { locale } = getPathnameParams(pathname);

  return locale;
}