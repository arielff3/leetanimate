"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

function TwoSumContent() {
  const [activeTab, setActiveTab] = useState("description");
  const { method, setMethod } = useTwoSum();

  const getMethodInfo = (selectedMethod) => {
    return selectedMethod === "hashmap"
      ? { name: "Hash Map", tags: ["#hash-map", "#O(n)-tempo", "#O(n)-espaço"] }
      : {
          name: "Two Pointers",
          tags: ["#two-pointers", "#O(nlogn)-tempo", "#O(1)-espaço"],
        };
  };

  const methodInfo = getMethodInfo(method);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div>
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2 mb-2">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-foreground">
                #1. Two Sum
              </h1>
              <p className="text-muted-foreground">Arrays • Easy</p>
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

          {/* Method Selector */}
          <div className="flex flex-col items-end gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Método de Solução
            </label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="min-w-[160px]">
                <SelectValue placeholder="Selecione o método" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hashmap">Hash Map</SelectItem>
                <SelectItem value="twopointers">Two Pointers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Preview Animation */}
        <div className="mb-8">
          <TwoSumPreview />
        </div>

        {/* Main Content */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Two Sum - {methodInfo.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="solution">Solution</TabsTrigger>
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
}

export default function TwoSumPage() {
  return (
    <TwoSumProvider>
      <TwoSumContent />
          </TwoSumProvider>
  );
}
