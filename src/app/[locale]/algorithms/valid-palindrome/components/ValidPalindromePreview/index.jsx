"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const ValidPalindromePreview = () => {
  const t = useTranslations('validPalindrome.preview');

  const exampleString = "A man, a plan, a canal: Panama";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <div className="font-mono text-sm">
              {t('string', { str: exampleString })}
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            {t('status.clickToView')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValidPalindromePreview;
