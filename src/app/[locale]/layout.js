import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { SettingsProvider } from "@/contexts/SettingsContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SettingsProvider>
        {children}
        <ThemeToggle />
        <LanguageToggle />
      </SettingsProvider>
    </NextIntlClientProvider>
  );
} 