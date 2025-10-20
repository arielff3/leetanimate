"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReverseStringDescription from "./components/ReverseStringDescription";
import ReverseStringCode from "./components/ReverseStringCode";
import ReverseStringSolution from "./components/ReverseStringSolution";
import ReverseStringPreview from "./components/ReverseStringPreview";
import { ReverseStringProvider, useReverseString } from "./contexts/ReverseStringContext";

const ReverseStringContent = () => {
  const [activeTab, setActiveTab] = useState("description");
  const { method, setMethod } = useReverseString();
  const locale = useLocale();
  const t = useTranslations('reverseString');

  const getMethodInfo = (selectedMethod) => {
    return selectedMethod === "twopointers"
      ? {
          name: t('methods.twopointers'),
          tags: [t('tags.twoPointers'), t('tags.onTime'), t('tags.o1Space'), t('tags.inPlace')]
        }
      : {
          name: t('methods.builtin'),
          tags: [t('tags.builtin'), t('tags.onTime'), t('tags.onSpace')],
        };
  };

  const methodInfo = getMethodInfo(method);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div>
              <Link href={`/${locale}`}>
                <Button variant="ghost" size="sm" className="gap-2 mb-2">
                  <ArrowLeft className="h-4 w-4" />
                  {t('backButton')}
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-foreground">
                #344. {t('title')}
              </h1>
              <p className="text-muted-foreground">{t('category')}</p>
              <div className="flex gap-2 mt-2">
                {methodInfo.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              {t('methodSelector')}
            </label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="min-w-[160px]">
                <SelectValue placeholder={t('selectMethod')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="twopointers">{t('methods.twopointers')}</SelectItem>
                <SelectItem value="builtin">{t('methods.builtin')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-8">
          <ReverseStringPreview />
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t('titleWithMethod', { method: methodInfo.name })}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">{t('tabs.description')}</TabsTrigger>
                <TabsTrigger value="code">{t('tabs.code')}</TabsTrigger>
                <TabsTrigger value="solution">{t('tabs.solution')}</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <ReverseStringDescription />
              </TabsContent>

              <TabsContent value="code" className="mt-6">
                <ReverseStringCode />
              </TabsContent>

              <TabsContent value="solution" className="mt-6">
                <ReverseStringSolution />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ReverseStringPage = () => {
  return (
    <ReverseStringProvider>
      <ReverseStringContent />
    </ReverseStringProvider>
  );
};

export default ReverseStringPage;
