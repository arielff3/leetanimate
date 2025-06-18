import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  locales,
  defaultLocale: 'pt'
});

export const config = {
  matcher: ['/', '/(pt|en)/:path*', '/((?!api|_next/static|_next/image|favicon.ico).*)']
}; 