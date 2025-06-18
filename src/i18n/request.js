import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['pt', 'en'];

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale)) {
    locale = 'pt'; // Default to Portuguese
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
}); 