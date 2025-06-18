import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { SettingsProvider } from "@/contexts/SettingsContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";

const LocaleLayout = async ({ children, params }) => {
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
};

export default LocaleLayout; 