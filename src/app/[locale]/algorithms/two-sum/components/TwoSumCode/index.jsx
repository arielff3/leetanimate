"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTwoSum } from "../../contexts/TwoSumContext";
import { useTranslations } from "next-intl";
import {
  hashMapJavaScript,
  hashMapPython,
  twoPointersJavaScript,
  twoPointersPython,
  getAlgorithmExplanations
} from "./constants";

export default function TwoSumCode() {
  const [activeLanguage, setActiveLanguage] = useState("javascript");
  const { method } = useTwoSum();
  const t = useTranslations('twoSum.code');
  const tMethods = useTranslations('twoSum.methods');
  const tMain = useTranslations();

  const getCurrentCode = () => {
    if (method === "hashmap") {
      return activeLanguage === "javascript" ? hashMapJavaScript : hashMapPython;
    } else {
      return activeLanguage === "javascript" ? twoPointersJavaScript : twoPointersPython;
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
  };

  const getMethodTitle = () => {
    return method === "hashmap" ? tMethods('hashmap') : tMethods('twopointers');
  };

  const algorithmExplanations = getAlgorithmExplanations(tMain);
  const currentExplanation = algorithmExplanations[method];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('implementations', { method: getMethodTitle() })}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeLanguage} onValueChange={setActiveLanguage} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="javascript">{t('javascript')}</TabsTrigger>
              <TabsTrigger value="python">{t('python')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="javascript" className="mt-4">
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {t('javascript')} - {t('solution', { method: getMethodTitle() })}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(getCurrentCode())}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      {t('copy')}
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <SyntaxHighlighter
                    language="javascript"
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      fontSize: '14px',
                      lineHeight: '1.5'
                    }}
                  >
                    {method === "hashmap" ? hashMapJavaScript : twoPointersJavaScript}
                  </SyntaxHighlighter>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="python" className="mt-4">
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {t('python')} - {t('solution', { method: getMethodTitle() })}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(getCurrentCode())}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      {t('copy')}
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <SyntaxHighlighter
                    language="python"
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      fontSize: '14px',
                      lineHeight: '1.5'
                    }}
                  >
                    {method === "hashmap" ? hashMapPython : twoPointersPython}
                  </SyntaxHighlighter>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Algorithm Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('algorithmExplanation', { method: getMethodTitle() })}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">{t('approach')}: {currentExplanation.title}</h4>
            <p className="text-muted-foreground leading-relaxed">
              {currentExplanation.description}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">{t('complexity')}:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• <strong>{t('time')}:</strong> {currentExplanation.complexity.time}</li>
              <li>• <strong>{t('space')}:</strong> {currentExplanation.complexity.space}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">{t('steps')}:</h4>
            <ol className="space-y-1 text-muted-foreground list-decimal list-inside">
              {currentExplanation.steps.map((step, index) => (
                <li key={index} className={step.startsWith('•') ? 'ml-4' : ''}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 