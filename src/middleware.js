import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'pt'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pt|en)/:path*', '/((?!api|_next/static|_next/image|favicon.ico).*)']
}; 