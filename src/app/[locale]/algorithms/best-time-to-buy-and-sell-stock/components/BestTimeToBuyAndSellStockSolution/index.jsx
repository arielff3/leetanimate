"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PREDEFINED_EXAMPLES, SPEED_VALUES } from "./constants";
import { pricesValidationSchema } from "./utils/validations";

const BestTimeToBuyAndSellStockSolution = () => {
  const t = useTranslations('bestTimeToBuyAndSellStock.solution');
  const tVal = useTranslations('validation');

  const [prices, setPrices] = useState([7, 1, 5, 3, 6, 4]);
  const [customPrices, setCustomPrices] = useState("7,1,5,3,6,4");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState("normal");
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [metrics, setMetrics] = useState({
    operations: 0,
    comparisons: 0
  });

  useEffect(() => {
    if (isPlaying && !isPaused && currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, SPEED_VALUES[speed]);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length && steps.length > 0) {
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [isPlaying, isPaused, currentStep, steps, speed]);

  const generateSteps = (priceArray) => {
    const tempSteps = [];
    let minPrice = Infinity;
    let maxProfit = 0;
    let buyDay = -1;
    let sellDay = -1;
    let tempBuyDay = -1;
    let opCount = 0;
    let compCount = 0;

    tempSteps.push({
      prices: priceArray,
      currentDay: -1,
      minPrice: Infinity,
      maxProfit: 0,
      buyDay: -1,
      sellDay: -1,
      message: t('initializing'),
      status: 'init'
    });

    for (let i = 0; i < priceArray.length; i++) {
      opCount++;
      compCount++;

      tempSteps.push({
        prices: priceArray,
        currentDay: i,
        minPrice,
        maxProfit,
        buyDay,
        sellDay,
        message: t('checkingDay', { day: i, price: priceArray[i] }),
        status: 'checking'
      });

      if (priceArray[i] < minPrice) {
        minPrice = priceArray[i];
        tempBuyDay = i;

        tempSteps.push({
          prices: priceArray,
          currentDay: i,
          minPrice,
          maxProfit,
          buyDay,
          sellDay,
          message: t('newMinPrice', { day: i, price: priceArray[i] }),
          status: 'newMin'
        });
      } else {
        const profit = priceArray[i] - minPrice;
        compCount++;

        tempSteps.push({
          prices: priceArray,
          currentDay: i,
          minPrice,
          maxProfit,
          buyDay,
          sellDay,
          message: t('calculatingProfit', { day: i, price: priceArray[i], minPrice, profit }),
          status: 'calculating'
        });

        if (profit > maxProfit) {
          maxProfit = profit;
          buyDay = tempBuyDay;
          sellDay = i;

          tempSteps.push({
            prices: priceArray,
            currentDay: i,
            minPrice,
            maxProfit,
            buyDay,
            sellDay,
            message: t('newMaxProfit', { buyDay, sellDay, profit: maxProfit }),
            status: 'newMax'
          });
        }
      }
    }

    tempSteps.push({
      prices: priceArray,
      currentDay: -1,
      minPrice,
      maxProfit,
      buyDay,
      sellDay,
      message: maxProfit > 0
        ? t('finished', { buyDay, sellDay, profit: maxProfit })
        : t('finishedNoProfit'),
      status: 'finished',
      metrics: { operations: opCount, comparisons: compCount }
    });

    return tempSteps;
  };

  const handleExecute = () => {
    const generatedSteps = generateSteps(prices);
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsPlaying(true);
    setIsPaused(false);
    setMetrics({ operations: 0, comparisons: 0 });
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleReset = () => {
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setIsPaused(false);
    setMetrics({ operations: 0, comparisons: 0 });
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleApplyCustom = () => {
    try {
      pricesValidationSchema(tVal).parse({ prices: customPrices });
      const priceArray = customPrices.split(',').map(n => parseInt(n.trim()));
      setPrices(priceArray);
      handleReset();
      toast.success(t('customization.applied'));
    } catch (error) {
      if (error.errors && error.errors[0]) {
        toast.error(error.errors[0].message);
      }
    }
  };

  const handleExampleSelect = (index) => {
    const example = PREDEFINED_EXAMPLES[index];
    setPrices(example.prices);
    setCustomPrices(example.prices.join(','));
    handleReset();
  };

  const currentStepData = steps[currentStep] || {
    prices,
    currentDay: -1,
    minPrice: Infinity,
    maxProfit: 0,
    buyDay: -1,
    sellDay: -1,
    message: t('waitingToStart'),
    status: 'waiting'
  };

  useEffect(() => {
    if (currentStepData.metrics) {
      setMetrics(currentStepData.metrics);
    }
  }, [currentStepData]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleExecute} disabled={isPlaying && !isPaused}>
              <Play className="h-4 w-4 mr-2" />
              {t('execute')}
            </Button>
            <Button onClick={handlePause} disabled={!isPlaying} variant="outline">
              <Pause className="h-4 w-4 mr-2" />
              {isPaused ? t('resume') : t('pause')}
            </Button>
            <Button onClick={handleRestart} disabled={steps.length === 0} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              {t('restart')}
            </Button>
            <Button onClick={handleNextStep} disabled={!isPlaying || currentStep >= steps.length - 1} variant="outline">
              <SkipForward className="h-4 w-4 mr-2" />
              {t('nextStep')}
            </Button>
            <Button onClick={handleReset} variant="outline">
              {t('reset')}
            </Button>

            <div className="ml-auto flex items-center gap-2">
              <Label>{t('speed')}</Label>
              <Select value={speed} onValueChange={setSpeed}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">{t('speedOptions.slow')}</SelectItem>
                  <SelectItem value="normal">{t('speedOptions.normal')}</SelectItem>
                  <SelectItem value="fast">{t('speedOptions.fast')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('visualization')}</h3>
            <div className="bg-muted p-8 rounded-lg">
              <div className="flex justify-center gap-2 mb-4">
                <AnimatePresence mode="popLayout">
                  {currentStepData.prices.map((price, index) => {
                    const isCurrent = currentStepData.currentDay === index;
                    const isBuy = currentStepData.buyDay === index;
                    const isSell = currentStepData.sellDay === index;

                    let bgColor = 'rgb(226 232 240)';
                    if (isCurrent) bgColor = 'rgb(59 130 246)';
                    if (isBuy) bgColor = 'rgb(34 197 94)';
                    if (isSell) bgColor = 'rgb(234 179 8)';

                    return (
                      <motion.div
                        key={index}
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          backgroundColor: bgColor,
                        }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`
                          w-16 h-16 flex flex-col items-center justify-center rounded-lg font-mono font-bold relative
                          ${(isCurrent || isBuy || isSell) ? 'text-white' : 'text-foreground'}
                        `}
                      >
                        <div className="text-xs">D{index}</div>
                        <div className="text-lg">{price}</div>
                        {isBuy && (
                          <div className="absolute -bottom-6 text-xs font-semibold text-green-600">BUY</div>
                        )}
                        {isSell && (
                          <div className="absolute -bottom-6 text-xs font-semibold text-yellow-600">SELL</div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('currentStatus')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">{currentStepData.message}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-sm text-muted-foreground">{t('minPrice')}</div>
                  <div className="text-xl font-bold">
                    {currentStepData.minPrice === Infinity ? '-' : currentStepData.minPrice}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t('maxProfit')}</div>
                  <div className="text-xl font-bold">{currentStepData.maxProfit}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('performanceMetrics')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">{t('operations')}</div>
                  <div className="text-2xl font-bold">{metrics.operations}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t('comparisons')}</div>
                  <div className="text-2xl font-bold">{metrics.comparisons}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t('timeComplexity')}</div>
                  <div className="text-lg font-mono">O(n)</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t('spaceComplexity')}</div>
                  <div className="text-lg font-mono">O(1)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('customize')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customPrices">{t('customization.pricesLabel')}</Label>
            <Input
              id="customPrices"
              value={customPrices}
              onChange={(e) => setCustomPrices(e.target.value)}
              placeholder="7,1,5,3,6,4"
            />
          </div>
          <Button onClick={handleApplyCustom}>{t('customization.apply')}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('predefinedExamples')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {PREDEFINED_EXAMPLES.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleExampleSelect(index)}
              >
                {t('example')} {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BestTimeToBuyAndSellStockSolution;
