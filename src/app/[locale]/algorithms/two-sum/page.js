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
import TwoSumDescription from "./components/TwoSumDescription";
import TwoSumCode from "./components/TwoSumCode";
import TwoSumSolution from "./components/TwoSumSolution";
import TwoSumPreview from "./components/TwoSumPreview";
import { TwoSumProvider, useTwoSum } from "./contexts/TwoSumContext";

const TwoSumContent = () => {
  const [activeTab, setActiveTab] = useState("description");
  const { method, setMethod } = useTwoSum();
  const locale = useLocale();
  const t = useTranslations('twoSum');

  const getMethodInfo = (selectedMethod) => {
    return selectedMethod === "hashmap"
      ? { 
          name: t('methods.hashmap'), 
          tags: [t('tags.hashMap'), t('tags.onTime'), t('tags.onSpace')] 
        }
      : {
          name: t('methods.twopointers'),
          tags: [t('tags.twoPointers'), t('tags.nlogTime'), t('tags.o1Space')],
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
                #1. {t('title')}
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
                <SelectItem value="hashmap">{t('methods.hashmap')}</SelectItem>
                <SelectItem value="twopointers">{t('methods.twopointers')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-8">
          <TwoSumPreview />
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
                <TwoSumDescription />
              </TabsContent>

              <TabsContent value="code" className="mt-6">
                <TwoSumCode />
              </TabsContent>

              <TabsContent value="solution" className="mt-6">
                <TwoSumSolution />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const TwoSumPage = () => {
  return (
    <TwoSumProvider>
      <TwoSumContent />
    </TwoSumProvider>
  );
};

export default TwoSumPage;
