"use client";

import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/contexts/SettingsContext";
import { useTranslations } from "next-intl";

export function LanguageToggle() {
  const { locale, changeLocale } = useSettings();
  const t = useTranslations('common');

  const getLanguageFlag = () => {
    return locale === "pt" ? "🇧🇷" : "🇺🇸";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-20 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        >
          {getLanguageFlag()}
          <span className="sr-only">{t('language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem 
          onClick={() => changeLocale("pt")}
          className="flex items-center gap-2"
        >
          <span>🇧🇷</span>
          {t('portuguese')}
          {locale === "pt" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLocale("en")}
          className="flex items-center gap-2"
        >
          <span>🇺🇸</span>
          {t('english')}
          {locale === "en" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 