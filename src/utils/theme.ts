import { cookies, type UnsafeUnwrappedCookies } from 'next/headers';

export function getInitialTheme() {
  return (cookies() as unknown as UnsafeUnwrappedCookies).get('theme')?.value || 'light';
}
