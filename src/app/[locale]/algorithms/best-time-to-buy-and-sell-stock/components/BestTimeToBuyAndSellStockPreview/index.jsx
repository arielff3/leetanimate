"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const BestTimeToBuyAndSellStockPreview = () => {
  const t = useTranslations('bestTimeToBuyAndSellStock.preview');

  const examplePrices = [7, 1, 5, 3, 6, 4];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <div className="font-mono text-sm">
              {t('prices', { prices: examplePrices.join(', ') })}
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

export default BestTimeToBuyAndSellStockPreview;
