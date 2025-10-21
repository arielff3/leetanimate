"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useReverseString } from "../../contexts/ReverseStringContext";
import { CODE_EXAMPLES } from "./constants";

const ReverseStringCode = () => {
  const [activeLanguage, setActiveLanguage] = useState("javascript");
  const { method } = useReverseString();
  const t = useTranslations('reverseString');

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(t('code.copy'));
  };

  const methodName = method === "twopointers" ? t('methods.twopointers') : t('methods.builtin');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {t('code.implementations', { method: methodName })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeLanguage} onValueChange={setActiveLanguage}>
            <TabsList>
              <TabsTrigger value="javascript">{t('code.javascript')}</TabsTrigger>
              <TabsTrigger value="python">{t('code.python')}</TabsTrigger>
            </TabsList>

            <TabsContent value="javascript" className="mt-4">
              <div className="relative">
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy(CODE_EXAMPLES[method].javascript)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{CODE_EXAMPLES[method].javascript}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="python" className="mt-4">
              <div className="relative">
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy(CODE_EXAMPLES[method].python)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{CODE_EXAMPLES[method].python}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {t('code.algorithmExplanation', { method: methodName })}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">{t('code.approach')}</h4>
            <p className="text-muted-foreground">
              {t(`algorithmExplanations.${method}.description`)}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">{t('code.complexity')}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                • <strong>{t('code.time')}:</strong>{' '}
                {t(`algorithmExplanations.${method}.complexity.time`)}
              </li>
              <li>
                • <strong>{t('code.space')}:</strong>{' '}
                {t(`algorithmExplanations.${method}.complexity.space`)}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">{t('code.steps')}</h4>
            <ol className="space-y-2 text-muted-foreground">
              {t.raw(`algorithmExplanations.${method}.steps`).map((step, index) => (
                <li key={index}>
                  {step.startsWith('•') ? (
                    <span className="ml-4">{step}</span>
                  ) : (
                    <span>{index + 1}. {step}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReverseStringCode;
