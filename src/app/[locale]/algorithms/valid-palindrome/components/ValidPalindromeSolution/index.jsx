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
import { stringValidationSchema } from "./utils/validations";

const ValidPalindromeSolution = () => {
  const t = useTranslations('validPalindrome.solution');
  const tVal = useTranslations('validation');

  const [string, setString] = useState("A man, a plan, a canal: Panama");
  const [customString, setCustomString] = useState("A man, a plan, a canal: Panama");
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

  const generateSteps = (str) => {
    const tempSteps = [];
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleaned.length - 1;
    let comparisonCount = 0;
    let opCount = 0;

    tempSteps.push({
      original: str,
      cleaned,
      left,
      right,
      message: t('cleaning', { cleaned }),
      status: 'init',
      isPalindrome: null
    });

    tempSteps.push({
      original: str,
      cleaned,
      left,
      right,
      message: t('initializingPointers'),
      status: 'init',
      isPalindrome: null
    });

    while (left < right) {
      opCount++;
      comparisonCount++;

      tempSteps.push({
        original: str,
        cleaned,
        left,
        right,
        message: t('comparing', { left, right, leftChar: cleaned[left], rightChar: cleaned[right] }),
        status: 'comparing',
        isPalindrome: null
      });

      if (cleaned[left] !== cleaned[right]) {
        tempSteps.push({
          original: str,
          cleaned,
          left,
          right,
          message: t('notPalindrome', { leftChar: cleaned[left], rightChar: cleaned[right] }),
          status: 'finished',
          isPalindrome: false,
          metrics: { operations: opCount, comparisons: comparisonCount }
        });
        return tempSteps;
      }

      tempSteps.push({
        original: str,
        cleaned,
        left,
        right,
        message: t('match', { leftChar: cleaned[left], rightChar: cleaned[right] }),
        status: 'match',
        isPalindrome: null
      });

      left++;
      right--;

      if (left < right) {
        tempSteps.push({
          original: str,
          cleaned,
          left,
          right,
          message: t('movingPointers', { left, right }),
          status: 'moving',
          isPalindrome: null
        });
      }
    }

    tempSteps.push({
      original: str,
      cleaned,
      left,
      right,
      message: t('isPalindrome'),
      status: 'finished',
      isPalindrome: true,
      metrics: { operations: opCount, comparisons: comparisonCount }
    });

    return tempSteps;
  };

  const handleExecute = () => {
    const generatedSteps = generateSteps(string);
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
      stringValidationSchema(tVal).parse({ string: customString });
      setString(customString);
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
    setString(example.string);
    setCustomString(example.string);
    handleReset();
  };

  const currentStepData = steps[currentStep] || {
    original: string,
    cleaned: string.toLowerCase().replace(/[^a-z0-9]/g, ''),
    message: t('waitingToStart'),
    status: 'waiting',
    isPalindrome: null
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
            <div className="bg-muted p-8 rounded-lg space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-2">{t('originalString')}</div>
                <div className="font-mono text-lg">{currentStepData.original}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">{t('cleanedString')}</div>
                <div className="flex flex-wrap justify-center gap-1">
                  <AnimatePresence mode="popLayout">
                    {currentStepData.cleaned.split('').map((char, index) => {
                      const isLeft = currentStepData.left === index;
                      const isRight = currentStepData.right === index;
                      const isActive = isLeft || isRight;

                      return (
                        <motion.div
                          key={`${index}-${char}`}
                          layout
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                            backgroundColor: isActive
                              ? currentStepData.status === 'comparing'
                                ? 'rgb(234 179 8)'
                                : currentStepData.status === 'match'
                                ? 'rgb(34 197 94)'
                                : 'rgb(59 130 246)'
                              : 'rgb(226 232 240)',
                          }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`
                            w-10 h-10 flex items-center justify-center rounded-lg font-mono font-bold relative
                            ${isActive ? 'text-white' : 'text-foreground'}
                          `}
                        >
                          {char}
                          {isLeft && (
                            <div className="absolute -bottom-6 text-xs font-semibold text-blue-600">L</div>
                          )}
                          {isRight && (
                            <div className="absolute -bottom-6 text-xs font-semibold text-blue-600">R</div>
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('currentStatus')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{currentStepData.message}</p>
              {currentStepData.isPalindrome !== null && (
                <div className={`mt-4 p-4 rounded-lg font-semibold ${
                  currentStepData.isPalindrome
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}>
                  {currentStepData.isPalindrome ? t('resultPalindrome') : t('resultNotPalindrome')}
                </div>
              )}
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
                  <div className="text-lg font-mono">O(n)</div>
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
            <Label htmlFor="customString">{t('customization.stringLabel')}</Label>
            <Input
              id="customString"
              value={customString}
              onChange={(e) => setCustomString(e.target.value)}
              placeholder="A man, a plan, a canal: Panama"
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

export default ValidPalindromeSolution;
