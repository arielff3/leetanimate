"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Settings,
  Zap,
  Eye,
  Clock,
  BookOpen,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { PREDEFINED_EXAMPLES, INITIAL_STATE, SPEED_OPTIONS } from "./constants";
import { createValidationSchemas, parseArrayString, sortArray } from "./utils/validations";

const RemoveDuplicatesSolution = () => {
  const t = useTranslations("removeDuplicates.solution");
  const tMethods = useTranslations("removeDuplicates.methods");
  const tSpeed = useTranslations("removeDuplicates.solution.speedOptions");
  const tValidation = useTranslations();

  const [state, setState] = useState(() => ({
    ...INITIAL_STATE,
    currentArray: [...INITIAL_STATE.currentArray],
    nums: [...INITIAL_STATE.nums]
  }));
  const [selectedExample, setSelectedExample] = useState(0);
  const [showCustomization, setShowCustomization] = useState(false);
  const [customInput, setCustomInput] = useState({ nums: "" });
  const [validationErrors, setValidationErrors] = useState({});

  const resetAnimation = useCallback(() => {
    setState((prev) => {
      const sortedNums = sortArray(prev.nums);
      return {
        ...INITIAL_STATE,
        speed: prev.speed,
        nums: sortedNums,
        currentArray: [...sortedNums],
      };
    });
  }, []);

  useEffect(() => {
    resetAnimation();
  }, [resetAnimation]);

  const togglePlay = () => {
    if (state.isComplete) {
      resetAnimation();
    }
    setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const nextStep = () => {
    if (!state.isComplete && !state.isPlaying) {
      executeStep();
    }
  };

  const executeStep = useCallback(() => {
    executeTwoPointersStep();
  }, [state]);

  const executeTwoPointersStep = () => {
    setState((prev) => {
      if (prev.readPointer >= (prev.currentArray?.length || 0)) {
        const finalLength = prev.uniquePointer + 1;
        const newHistory = [
          ...prev.stepHistory,
          {
            step: prev.stepHistory.length + 1,
            action: t("algorithmFinished"),
            details: t("finalLength", { length: finalLength }),
            type: "success",
          },
        ];
        return {
          ...prev,
          finalLength,
          isComplete: true,
          isPlaying: false,
          stepHistory: newHistory,
          currentOperation: t("finished"),
          detailedStatus: t("finalResult", { length: finalLength }),
        };
      }

      const uniqueVal = prev.currentArray[prev.uniquePointer];
      const readVal = prev.currentArray[prev.readPointer];
      const newOperationCount = prev.operationCount + 1;
      const newComparisons = prev.comparisons + 1;

      const stepAction = t("checkingElement", { read: prev.readPointer, value: readVal });

      if (uniqueVal === readVal) {
        const newHistory = [
          ...prev.stepHistory,
          {
            step: prev.stepHistory.length + 1,
            action: stepAction,
            details: t("duplicateFound", { 
              unique: prev.uniquePointer,
              read: prev.readPointer,
              value: readVal 
            }),
            type: "info",
          },
        ];

        return {
          ...prev,
          readPointer: prev.readPointer + 1,
          stepHistory: newHistory,
          operationCount: newOperationCount,
          comparisons: newComparisons,
          currentOperation: t("skipping"),
          detailedStatus: t("movingPointers", { 
            unique: prev.uniquePointer, 
            read: prev.readPointer + 1 
          }),
        };
      } else {
        const newUniquePointer = prev.uniquePointer + 1;
        const newArray = [...prev.currentArray];
        newArray[newUniquePointer] = readVal;
        const newWrites = prev.writes + 1;

        const newHistory = [
          ...prev.stepHistory,
          {
            step: prev.stepHistory.length + 1,
            action: stepAction,
            details: t("uniqueFound", { 
              unique: prev.uniquePointer,
              read: prev.readPointer,
              newUnique: newUniquePointer 
            }) + " " + t("writingUnique", { 
              read: prev.readPointer,
              value: readVal,
              unique: newUniquePointer 
            }),
            type: "success",
          },
        ];

        return {
          ...prev,
          uniquePointer: newUniquePointer,
          readPointer: prev.readPointer + 1,
          currentArray: newArray,
          stepHistory: newHistory,
          operationCount: newOperationCount,
          comparisons: newComparisons,
          writes: newWrites,
          currentOperation: t("writing"),
          detailedStatus: t("movingPointers", { 
            unique: newUniquePointer, 
            read: prev.readPointer + 1 
          }),
        };
      }
    });
  };

  useEffect(() => {
    if (state.isPlaying && !state.isComplete) {
      const timer = setTimeout(() => {
        executeTwoPointersStep();
      }, state.speed);
      return () => clearTimeout(timer);
    }
  }, [state.isPlaying, state.isComplete, state.speed, state.readPointer]);

  const selectExample = (index) => {
    const example = PREDEFINED_EXAMPLES[index];
    
    if (!example || !example.nums) {
      return;
    }
    
    const sortedNums = sortArray(example.nums);
    
    setState((prev) => {
      const newState = {
        ...INITIAL_STATE,
        speed: prev?.speed || SPEED_OPTIONS.NORMAL,
        nums: sortedNums,
        currentArray: [...sortedNums],
      };
      return newState;
    });
    setSelectedExample(index);
  };

  const applyCustomization = () => {
    const schema = createValidationSchemas(tValidation);
    const result = schema.safeParse({
      nums: customInput.nums,
    });

    if (!result.success) {
      const errors = {};
      result.error.errors.forEach((error) => {
        errors[error.path[0]] = error.message;
      });
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    const numsArray = parseArrayString(customInput.nums);
    const sortedNums = sortArray(numsArray);
    
    setState((prev) => ({
      ...INITIAL_STATE,
      speed: prev.speed,
      nums: sortedNums,
      currentArray: [...sortedNums],
    }));
    setShowCustomization(false);
  };

  const getSpeedLabel = () => {
    switch (state.speed) {
      case SPEED_OPTIONS.SLOW:
        return tSpeed("slow");
      case SPEED_OPTIONS.NORMAL:
        return tSpeed("normal");
      case SPEED_OPTIONS.FAST:
        return tSpeed("fast");
      default:
        return tSpeed("normal");
    }
  };

  const getExampleLabel = (example, index) => {
    if (!example || !Array.isArray(example.nums)) {
      return `${t("exampleLabel")} ${index + 1}: []`;
    }
    return `${t("exampleLabel")} ${index + 1}: [${example.nums.join(',')}]`;
  };

  const getComplexityInfo = () => {
    const n = state.nums?.length || 0;
    return {
      time: `O(n) = O(${n})`,
      space: `O(1)`,
      operations: state.operationCount,
      comparisons: state.comparisons,
      writes: state.writes,
    };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Eye className="h-5 w-5" />
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <Button onClick={togglePlay} className="gap-2">
              {state.isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {state.isPlaying
                ? t("pause")
                : state.isComplete
                ? t("restart")
                : t("execute")}
            </Button>

            <Button
              onClick={nextStep}
              variant="outline"
              className="gap-2"
              disabled={state.isPlaying || state.isComplete}
            >
              <SkipForward className="h-4 w-4" />
              {t("nextStep")}
            </Button>

            <Button
              onClick={resetAnimation}
              variant="outline"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              {t("reset")}
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t("speed")}:</span>
              <Select
                value={state.speed.toString()}
                onValueChange={(value) =>
                  setState((prev) => ({ ...prev, speed: parseInt(value) }))
                }
              >
                <SelectTrigger className="w-24">
                  <SelectValue>{getSpeedLabel()}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SPEED_OPTIONS.SLOW.toString()}>
                    {tSpeed("slow")}
                  </SelectItem>
                  <SelectItem value={SPEED_OPTIONS.NORMAL.toString()}>
                    {tSpeed("normal")}
                  </SelectItem>
                  <SelectItem value={SPEED_OPTIONS.FAST.toString()}>
                    {tSpeed("fast")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => setShowCustomization(!showCustomization)}
              variant="outline"
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              {t("customize")}
            </Button>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">
              {t("predefinedExamples")}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {PREDEFINED_EXAMPLES.map((example, index) => (
                <Button
                  key={index}
                  variant={selectedExample === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => selectExample(index)}
                  className="text-xs"
                >
                  {getExampleLabel(example, index)}
                </Button>
              ))}
            </div>
          </div>

          {showCustomization && (
            <div className="mt-4 p-4 border rounded-lg bg-muted/50">
              <h4 className="text-sm font-medium mb-3">
                {t("customization.title")}
              </h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    {t("customization.arrayLabel")}
                  </label>
                  <Input
                    placeholder="1,1,2,2,3"
                    value={customInput.nums}
                    onChange={(e) =>
                      setCustomInput((prev) => ({
                        ...prev,
                        nums: e.target.value,
                      }))
                    }
                    className={validationErrors.nums ? "border-red-500" : ""}
                  />
                  {validationErrors.nums && (
                    <p className="text-xs text-red-500 mt-1">
                      {validationErrors.nums}
                    </p>
                  )}
                </div>
              </div>
              <Button onClick={applyCustomization} className="mt-3" size="sm">
                {t("customization.apply")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5" />
            {t("performanceMetrics")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-sm font-bold text-blue-600">
                {getComplexityInfo().operations}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("operations")}
              </div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-sm font-bold text-green-600">
                {getComplexityInfo().comparisons}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("comparisons")}
              </div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-sm font-bold text-purple-600">
                {getComplexityInfo().time}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("timeComplexity")}
              </div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-sm font-bold text-orange-600">
                {getComplexityInfo().space}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("spaceComplexity")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("visualization")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-4">
              {t("array")} nums = {JSON.stringify(state.currentArray || [])}
            </h3>
            <div className="flex gap-2 justify-center flex-wrap">
              {(state.currentArray || []).map((num, index) => {
                const isUniquePointer = state.uniquePointer === index;
                const isReadPointer = state.readPointer === index;
                const isProcessed = index <= state.uniquePointer;
                const isInFinalResult = state.finalLength && index < state.finalLength;
                const wasJustWritten = state.writes > 0 && index === state.uniquePointer && state.readPointer > index;

                return (
                  <motion.div
                    key={index}
                    className={`
                      w-16 h-16 border-2 rounded-lg flex flex-col items-center justify-center relative
                      ${
                        isUniquePointer
                          ? "border-green-500 bg-green-100 dark:bg-green-900"
                          : "border-gray-300"
                      }
                      ${
                        isReadPointer
                          ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                          : ""
                      }
                      ${
                        wasJustWritten
                          ? "border-yellow-500 bg-yellow-100 dark:bg-yellow-900"
                          : ""
                      }
                      ${
                        isInFinalResult && state.isComplete
                          ? "border-purple-500 bg-purple-100 dark:bg-purple-900"
                          : ""
                      }
                    `}
                    animate={{
                      scale: isUniquePointer || isReadPointer ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-lg font-bold">{num}</div>
                    <div className="text-xs text-muted-foreground">[{index}]</div>
                    {isUniquePointer && (
                      <div className="absolute -top-6 text-xs font-bold text-green-600">
                        unique
                      </div>
                    )}
                    {isReadPointer && (
                      <div className="absolute -top-6 text-xs font-bold text-blue-600">
                        read
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {t("currentStatus")}:
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {tMethods("twopointers")}
                </Badge>
                <span className="text-sm">
                  {state.currentOperation || t("waitingToStart")}
                </span>
              </div>

              {state.detailedStatus && (
                <p className="text-sm text-muted-foreground">
                  {state.detailedStatus}
                </p>
              )}

              {state.uniquePointer >= 0 && state.readPointer >= 0 && (
                <div className="text-sm">
                  <span className="font-medium">{t("pointers")}:</span> unique=
                  {state.uniquePointer}, read={state.readPointer}
                  <br />
                  <span className="font-medium">{t("currentComparison", { unique: state.uniquePointer, read: state.readPointer })}:</span>
                </div>
              )}
            </div>

            {state.finalLength && state.isComplete && (
              <div className="mt-3 p-2 bg-green-100 dark:bg-green-900 rounded text-green-800 dark:text-green-200">
                <p className="font-medium">
                  ✅ {t("finalLength", { length: state.finalLength })}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {state.stepHistory && state.stepHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {t("stepHistory")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 w-full">
              <div className="space-y-2 pr-4">
                <AnimatePresence>
                  {state.stepHistory.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 rounded-lg border-l-4 ${
                        step.type === "success"
                          ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                          : step.type === "error"
                          ? "bg-red-50 dark:bg-red-900/20 border-red-500"
                          : step.type === "init"
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500"
                          : "bg-gray-50 dark:bg-gray-900/20 border-gray-400"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="text-xs">
                          #{step.step}
                        </Badge>
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {step.action}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {step.details}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RemoveDuplicatesSolution; 