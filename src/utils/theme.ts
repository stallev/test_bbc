import { cookies } from 'next/headers';

export function getInitialTheme() {
  return cookies().get('theme')?.value || 'light';
}
