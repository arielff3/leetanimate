import { getRequestConfig } from 'next-intl/server';

export const locales = ['pt', 'en'];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale)) {
    locale = 'pt';
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
}); 