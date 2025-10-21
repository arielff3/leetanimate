"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useReverseString } from "../../contexts/ReverseStringContext";

const ReverseStringPreview = () => {
  const { method } = useReverseString();
  const t = useTranslations('reverseString.preview');

  const exampleString = ["h", "e", "l", "l", "o"];
  const methodName = method === "twopointers" ? t('status.twopointers') : t('status.builtin');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title', { method: methodName })}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <div className="font-mono text-sm">
              {t('array', { chars: exampleString.map(c => `"${c}"`).join(', ') })}
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

export default ReverseStringPreview;
