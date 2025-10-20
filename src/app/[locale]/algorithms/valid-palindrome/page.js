"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ValidPalindromeDescription from "./components/ValidPalindromeDescription";
import ValidPalindromeCode from "./components/ValidPalindromeCode";
import ValidPalindromeSolution from "./components/ValidPalindromeSolution";
import ValidPalindromePreview from "./components/ValidPalindromePreview";
import { ValidPalindromeProvider } from "./contexts/ValidPalindromeContext";

const ValidPalindromeContent = () => {
  const [activeTab, setActiveTab] = useState("description");
  const locale = useLocale();
  const t = useTranslations('validPalindrome');

  const tags = [t('tags.twoPointers'), t('tags.onTime'), t('tags.o1Space'), t('tags.string')];

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
                #125. {t('title')}
              </h1>
              <p className="text-muted-foreground">{t('category')}</p>
              <div className="flex gap-2 mt-2">
                {tags.map((tag, index) => (
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
        </div>

        <div className="mb-8">
          <ValidPalindromePreview />
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
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
                <ValidPalindromeDescription />
              </TabsContent>

              <TabsContent value="code" className="mt-6">
                <ValidPalindromeCode />
              </TabsContent>

              <TabsContent value="solution" className="mt-6">
                <ValidPalindromeSolution />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ValidPalindromePage = () => {
  return (
    <ValidPalindromeProvider>
      <ValidPalindromeContent />
    </ValidPalindromeProvider>
  );
};

export default ValidPalindromePage;
