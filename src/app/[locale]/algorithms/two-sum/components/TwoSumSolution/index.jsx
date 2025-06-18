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
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Settings,
  Hash,
  ArrowUpDown,
  Clock,
  Zap,
  Eye,
  BookOpen,
} from "lucide-react";
import { useTwoSum } from "../../contexts/TwoSumContext";
import { useTranslations } from "next-intl";
import { PREDEFINED_EXAMPLES, INITIAL_STATE, SPEED_OPTIONS } from "./constants";
import { customExampleSchema } from "@/lib/validations";

const TwoSumSolution = () => {
  const { method } = useTwoSum();
  const t = useTranslations("twoSum.solution");
  const tMethods = useTranslations("twoSum.methods");
  const tSpeed = useTranslations("twoSum.solution.speedOptions");

  const [state, setState] = useState({
    ...INITIAL_STATE,
    stepHistory: [],
    operationCount: 0,
    comparisons: 0,
    memoryUsage: 0,
    currentOperation: "",
    detailedStatus: "",
    hashMapOperations: [],
    pointerMovements: [],
  });
  const [selectedExample, setSelectedExample] = useState(0);
  const [showCustomization, setShowCustomization] = useState(false);
  const [customInput, setCustomInput] = useState({ nums: "", target: "" });
  const [validationErrors, setValidationErrors] = useState({});

  const resetAnimation = useCallback(() => {
    setState((prev) => ({
      ...INITIAL_STATE,
      speed: prev.speed,
      nums: prev.nums,
      target: prev.target,
      stepHistory: [],
      operationCount: 0,
      comparisons: 0,
      memoryUsage: 0,
      currentOperation: "",
      detailedStatus: "",
      hashMapOperations: [],
      pointerMovements: [],
    }));
  }, []);

  useEffect(() => {
    resetAnimation();
  }, [method, resetAnimation]);

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
    if (method === "hashmap") {
      executeHashMapStep();
    } else {
      executeTwoPointersStep();
    }
  }, [method, state]);

  const executeHashMapStep = () => {
    setState((prev) => {
      if (prev.currentIndex >= prev.nums.length - 1) {
        const newHistory = [
          ...prev.stepHistory,
          {
            step: prev.stepHistory.length + 1,
            action: t("algorithmFinished"),
            details: t("noSolutionAfterCheck"),
            type: "error",
          },
        ];
        return {
          ...prev,
          isComplete: true,
          isPlaying: false,
          noSolution: true,
          stepHistory: newHistory,
          currentOperation: t("finished"),
          detailedStatus: t("algorithmCompleted"),
        };
      }

      const nextIndex = prev.currentIndex + 1;
      const currentNum = prev.nums[nextIndex];
      const complement = prev.target - currentNum;
      const newHashMap = new Map(prev.hashMap);
      const newOperationCount = prev.operationCount + 1;
      const newComparisons = prev.comparisons + 1;

      const stepAction = `${t("verifying")} nums[${nextIndex}] = ${currentNum}`;
      const stepDetails = `${t("calculating")}: ${
        prev.target
      } - ${currentNum} = ${complement}`;

      if (newHashMap.has(complement)) {
        const solutionIndices = [newHashMap.get(complement), nextIndex];
        const newHistory = [
          ...prev.stepHistory,
          {
            step: prev.stepHistory.length + 1,
            action: stepAction,
            details: `${stepDetails}. ✅ ${t("complementFound", {
              complement,
              index: newHashMap.get(complement),
            })}`,
            type: "success",
          },
        ];

        return {
          ...prev,
          foundSolution: solutionIndices,
          isComplete: true,
          isPlaying: false,
          currentIndex: nextIndex,
          complement,
          stepHistory: newHistory,
          operationCount: newOperationCount,
          comparisons: newComparisons,
          currentOperation: t("solutionFoundDetailed"),
          detailedStatus: t("solutionDetailed", {
            index1: solutionIndices[0],
            index2: solutionIndices[1],
            val1: prev.nums[solutionIndices[0]],
            val2: prev.nums[solutionIndices[1]],
            target: prev.target,
          }),
          hashMapOperations: [
            ...prev.hashMapOperations,
            {
              type: "lookup",
              key: complement,
              found: true,
              index: newHashMap.get(complement),
            },
          ],
        };
      }

      newHashMap.set(currentNum, nextIndex);
      const newHistory = [
        ...prev.stepHistory,
        {
          step: prev.stepHistory.length + 1,
          action: stepAction,
          details: `${stepDetails}. ${t("complementNotFound", {
            num: currentNum,
            index: nextIndex,
          })}`,
          type: "info",
        },
      ];

      return {
        ...prev,
        currentIndex: nextIndex,
        hashMap: newHashMap,
        complement,
        stepHistory: newHistory,
        operationCount: newOperationCount,
        comparisons: newComparisons,
        memoryUsage: newHashMap.size,
        currentOperation: t("processing", {
          current: nextIndex + 1,
          total: prev.nums.length,
        }),
        detailedStatus: t("hashMapContains", { size: newHashMap.size }),
        hashMapOperations: [
          ...prev.hashMapOperations,
          {
            type: "insert",
            key: currentNum,
            value: nextIndex,
            found: false,
          },
        ],
      };
    });
  };

  const executeTwoPointersStep = () => {
    setState((prev) => {
      if (prev.leftPointer === -1) {
        const indexedNums = prev.nums.map((num, index) => ({
          num,
          originalIndex: index,
        }));
        const sorted = [...indexedNums].sort((a, b) => a.num - b.num);

        const newHistory = [
          {
            step: 1,
            action: t("initializingTwoPointers"),
            details: t("arraySorted", {
              array: sorted.map((item) => item.num).join(", "),
              right: sorted.length - 1,
            }),
            type: "init",
          },
        ];

        return {
          ...prev,
          sortedNums: sorted.map((item) => item.num),
          originalIndices: sorted.map((item) => item.originalIndex),
          leftPointer: 0,
          rightPointer: sorted.length - 1,
          stepHistory: newHistory,
          operationCount: 1,
          memoryUsage: sorted.length,
          currentOperation: "Array ordenado e ponteiros inicializados",
          detailedStatus: `Complexidade da ordenação: O(n log n) = O(${prev.nums.length} log ${prev.nums.length})`,
          pointerMovements: [
            {
              step: 1,
              left: 0,
              right: sorted.length - 1,
              action: "init",
            },
          ],
        };
      }

      const leftVal = prev.sortedNums[prev.leftPointer];
      const rightVal = prev.sortedNums[prev.rightPointer];
      const sum = leftVal + rightVal;
      const newComparisons = prev.comparisons + 1;
      const newOperationCount = prev.operationCount + 1;

      const stepAction = `Comparando L=${prev.leftPointer}, R=${prev.rightPointer}`;
      const stepDetails = `${leftVal} + ${rightVal} = ${sum}, target = ${prev.target}`;

      if (sum === prev.target) {
        const leftOriginal = prev.originalIndices[prev.leftPointer];
        const rightOriginal = prev.originalIndices[prev.rightPointer];
        const solutionIndices = [
          Math.min(leftOriginal, rightOriginal),
          Math.max(leftOriginal, rightOriginal),
        ];

        const newHistory = [
          ...prev.stepHistory,
          {
            step: prev.stepHistory.length + 1,
            action: stepAction,
            details: `${stepDetails}. ✅ Soma igual ao target! Índices originais: [${solutionIndices[0]}, ${solutionIndices[1]}]`,
            type: "success",
          },
        ];

        return {
          ...prev,
          foundSolution: solutionIndices,
          isComplete: true,
          isPlaying: false,
          stepHistory: newHistory,
          operationCount: newOperationCount,
          comparisons: newComparisons,
          currentOperation: "Solução encontrada!",
          detailedStatus: `Solução: nums[${solutionIndices[0]}] + nums[${
            solutionIndices[1]
          }] = ${prev.nums[solutionIndices[0]]} + ${
            prev.nums[solutionIndices[1]]
          } = ${prev.target}`,
          pointerMovements: [
            ...prev.pointerMovements,
            {
              step: prev.stepHistory.length + 1,
              left: prev.leftPointer,
              right: prev.rightPointer,
              action: "found",
              sum: sum,
            },
          ],
        };
      } else if (sum < prev.target) {
        if (prev.leftPointer >= prev.rightPointer - 1) {
          const newHistory = [
            ...prev.stepHistory,
            {
              step: prev.stepHistory.length + 1,
              action: stepAction,
              details: `${stepDetails}. Soma < target, mas ponteiros se encontraram. Nenhuma solução encontrada.`,
              type: "error",
            },
          ];
          return {
            ...prev,
            isComplete: true,
            isPlaying: false,
            noSolution: true,
            stepHistory: newHistory,
            operationCount: newOperationCount,
            comparisons: newComparisons,
            currentOperation: "Finalizado",
            detailedStatus: "Algoritmo concluído sem encontrar solução",
          };
        }

        const newHistory = [
          ...prev.stepHistory,
          {
            step: prev.stepHistory.length + 1,
            action: stepAction,
            details: `${stepDetails}. Soma < target, movendo ponteiro esquerdo: L=${
              prev.leftPointer
            } → L=${prev.leftPointer + 1}`,
            type: "info",
          },
        ];

        return {
          ...prev,
          leftPointer: prev.leftPointer + 1,
          stepHistory: newHistory,
          operationCount: newOperationCount,
          comparisons: newComparisons,
          currentOperation: `Movendo ponteiro esquerdo (soma muito pequena)`,
          detailedStatus: `Próxima comparação: nums[${
            prev.leftPointer + 1
          }] + nums[${prev.rightPointer}]`,
          pointerMovements: [
            ...prev.pointerMovements,
            {
              step: prev.stepHistory.length + 1,
              left: prev.leftPointer + 1,
              right: prev.rightPointer,
              action: "move_left",
              sum: sum,
            },
          ],
        };
      } else {
        if (prev.leftPointer >= prev.rightPointer - 1) {
          const newHistory = [
            ...prev.stepHistory,
            {
              step: prev.stepHistory.length + 1,
              action: stepAction,
              details: `${stepDetails}. Soma > target, mas ponteiros se encontraram. Nenhuma solução encontrada.`,
              type: "error",
            },
          ];
          return {
            ...prev,
            isComplete: true,
            isPlaying: false,
            noSolution: true,
            stepHistory: newHistory,
            operationCount: newOperationCount,
            comparisons: newComparisons,
            currentOperation: "Finalizado",
            detailedStatus: "Algoritmo concluído sem encontrar solução",
          };
        }

        const newHistory = [
          ...prev.stepHistory,
          {
            step: prev.stepHistory.length + 1,
            action: stepAction,
            details: `${stepDetails}. Soma > target, movendo ponteiro direito: R=${
              prev.rightPointer
            } → R=${prev.rightPointer - 1}`,
            type: "info",
          },
        ];

        return {
          ...prev,
          rightPointer: prev.rightPointer - 1,
          stepHistory: newHistory,
          operationCount: newOperationCount,
          comparisons: newComparisons,
          currentOperation: `Movendo ponteiro direito (soma muito grande)`,
          detailedStatus: `Próxima comparação: nums[${
            prev.leftPointer
          }] + nums[${prev.rightPointer - 1}]`,
          pointerMovements: [
            ...prev.pointerMovements,
            {
              step: prev.stepHistory.length + 1,
              left: prev.leftPointer,
              right: prev.rightPointer - 1,
              action: "move_right",
              sum: sum,
            },
          ],
        };
      }
    });
  };

  useEffect(() => {
    if (state.isPlaying && !state.isComplete) {
      const timer = setTimeout(executeStep, state.speed);
      return () => clearTimeout(timer);
    }
  }, [
    state.isPlaying,
    state.isComplete,
    state.currentStep,
    executeStep,
    state.speed,
  ]);

  const selectExample = (index) => {
    const example = PREDEFINED_EXAMPLES[index];
    setState((prev) => ({
      ...INITIAL_STATE,
      nums: example.nums,
      target: example.target,
      speed: prev.speed,
      stepHistory: [],
      operationCount: 0,
      comparisons: 0,
      memoryUsage: 0,
      currentOperation: "",
      detailedStatus: "",
      hashMapOperations: [],
      pointerMovements: [],
    }));
    setSelectedExample(index);
    setShowCustomization(false);
  };

  const applyCustomization = () => {
    try {
      const validation = customExampleSchema.safeParse(customInput);

      if (!validation.success) {
        const errors = {};
        validation.error.errors.forEach((error) => {
          errors[error.path[0]] = error.message;
        });
        setValidationErrors(errors);
        return;
      }

      setValidationErrors({});

      const nums = customInput.nums.split(",").map((n) => parseInt(n.trim()));
      const target = parseInt(customInput.target);

      setState((prev) => ({
        ...INITIAL_STATE,
        nums,
        target,
        speed: prev.speed,
        stepHistory: [],
        operationCount: 0,
        comparisons: 0,
        memoryUsage: 0,
        currentOperation: "",
        detailedStatus: "",
        hashMapOperations: [],
        pointerMovements: [],
      }));

      setSelectedExample(-1);
      setShowCustomization(false);
    } catch (error) {
      console.error("Error applying customization:", error);
    }
  };

  const getSpeedLabel = () => {
    switch (state.speed) {
      case SPEED_OPTIONS.SLOW:
        return t("speedOptions.slow");
      case SPEED_OPTIONS.FAST:
        return t("speedOptions.fast");
      default:
        return t("speedOptions.normal");
    }
  };

  const getExampleLabel = (example, index) => {
    return `${t("example")} ${example.id}: [${example.nums.join(
      ","
    )}], target=${example.target}`;
  };

  const displayNums =
    method === "twopointers" && state.sortedNums.length > 0
      ? state.sortedNums
      : state.nums;

  const getComplexityInfo = () => {
    const n = state.nums.length;
    if (method === "hashmap") {
      return {
        time: `O(n) = O(${n})`,
        space: `O(n) = O(${state.memoryUsage})`,
        operations: state.operationCount,
        comparisons: state.comparisons,
      };
    } else {
      return {
        time: `O(n log n) = O(${n} log ${n}) ≈ O(${Math.round(
          n * Math.log2(n)
        )})`,
        space: `O(n) = O(${n})`,
        operations: state.operationCount,
        comparisons: state.comparisons,
      };
    }
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
                    {t("speedOptions.slow")}
                  </SelectItem>
                  <SelectItem value={SPEED_OPTIONS.NORMAL.toString()}>
                    {t("speedOptions.normal")}
                  </SelectItem>
                  <SelectItem value={SPEED_OPTIONS.FAST.toString()}>
                    {t("speedOptions.fast")}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    {t("customization.arrayLabel")}
                  </label>
                  <Input
                    placeholder="2,7,11,15"
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
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    {t("customization.targetLabel")}
                  </label>
                  <Input
                    placeholder="9"
                    value={customInput.target}
                    onChange={(e) =>
                      setCustomInput((prev) => ({
                        ...prev,
                        target: e.target.value,
                      }))
                    }
                    className={validationErrors.target ? "border-red-500" : ""}
                  />
                  {validationErrors.target && (
                    <p className="text-xs text-red-500 mt-1">
                      {validationErrors.target}
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
              <div className="text-text-sm font-bold text-blue-600">
                {getComplexityInfo().operations}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("operations")}
              </div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-text-sm font-bold text-green-600">
                {getComplexityInfo().comparisons}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("comparisons")}
              </div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-text-sm font-bold text-purple-600">
                {getComplexityInfo().time}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("timeComplexity")}
              </div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-text-sm font-bold text-orange-600">
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
              {t("array")} nums = {JSON.stringify(state.nums)},{" "}
              {t("target", { target: state.target })}
            </h3>
            <div className="flex gap-2 justify-center flex-wrap">
              {displayNums.map((num, index) => {
                const isCurrentHashMap =
                  method === "hashmap" && state.currentIndex === index;
                const isLeftPointer =
                  method === "twopointers" && state.leftPointer === index;
                const isRightPointer =
                  method === "twopointers" && state.rightPointer === index;
                const isInSolution =
                  state.foundSolution &&
                  (method === "hashmap"
                    ? state.foundSolution.includes(index)
                    : state.foundSolution.includes(
                        state.originalIndices?.[index] || index
                      ));

                return (
                  <motion.div
                    key={`${method}-${index}`}
                    className={`
                      w-16 h-16 border-2 rounded-lg flex flex-col items-center justify-center relative
                      ${
                        isCurrentHashMap
                          ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                          : "border-gray-300"
                      }
                      ${
                        isLeftPointer
                          ? "border-purple-500 bg-purple-100 dark:bg-purple-900"
                          : ""
                      }
                      ${
                        isRightPointer
                          ? "border-orange-500 bg-orange-100 dark:bg-orange-900"
                          : ""
                      }
                      ${
                        isInSolution
                          ? "border-green-500 bg-green-100 dark:bg-green-900"
                          : ""
                      }
                    `}
                    animate={{
                      scale:
                        isCurrentHashMap || isLeftPointer || isRightPointer
                          ? 1.1
                          : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-lg font-bold">{num}</div>
                    <div className="text-xs text-muted-foreground">
                      [
                      {method === "twopointers" && state.originalIndices
                        ? state.originalIndices[index]
                        : index}
                      ]
                    </div>
                    {isLeftPointer && (
                      <div className="absolute -top-6 text-xs font-bold text-purple-600">
                        {t("leftPointer")}
                      </div>
                    )}
                    {isRightPointer && (
                      <div className="absolute -top-6 text-xs font-bold text-orange-600">
                        {t("rightPointer")}
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
                  {method === "hashmap" ? "Hash Map" : "Two Pointers"}
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

              {method === "hashmap" && state.currentIndex >= 0 && (
                <div className="text-sm">
                  <span className="font-medium">{t("verifying")}:</span> nums[
                  {state.currentIndex}] = {state.nums[state.currentIndex]}
                  <br />
                  <span className="font-medium">{t("complement")}:</span>{" "}
                  {state.target} - {state.nums[state.currentIndex]} ={" "}
                  {state.complement}
                </div>
              )}

              {method === "twopointers" &&
                state.leftPointer >= 0 &&
                state.rightPointer >= 0 && (
                  <div className="text-sm">
                    <span className="font-medium">{t("pointers")}:</span> L=
                    {state.leftPointer}, R={state.rightPointer}
                    <br />
                    <span className="font-medium">{t("sum")}:</span>{" "}
                    {displayNums[state.leftPointer]} +{" "}
                    {displayNums[state.rightPointer]} ={" "}
                    {displayNums[state.leftPointer] +
                      displayNums[state.rightPointer]}
                  </div>
                )}
            </div>

            {state.foundSolution && (
              <div className="mt-3 p-2 bg-green-100 dark:bg-green-900 rounded text-green-800 dark:text-green-200">
                <p className="font-medium">
                  ✅{" "}
                  {t("solutionFound", {
                    indices: `${state.foundSolution[0]}, ${state.foundSolution[1]}`,
                  })}
                </p>
              </div>
            )}

            {state.noSolution && (
              <div className="mt-3 p-2 bg-red-100 dark:bg-red-900 rounded text-red-800 dark:text-red-200">
                <p className="font-medium">❌ {t("noSolutionFound")}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {method === "hashmap" && state.hashMap.size > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Hash className="h-5 w-5" />
              {t("hashMapVisualization")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {Array.from(state.hashMap.entries()).map(
                ([key, value], index) => (
                  <motion.div
                    key={`hashmap-${key}-${value}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-2 border rounded-lg text-center bg-blue-50 dark:bg-blue-900"
                  >
                    <div className="text-sm font-bold">{key}</div>
                    <div className="text-xs text-muted-foreground">
                      {t("indexArrow", { index: value })}
                    </div>
                  </motion.div>
                )
              )}
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              <strong>{t("currentSize")}:</strong> {state.hashMap.size}{" "}
              {t("elements")}
            </div>
          </CardContent>
        </Card>
      )}

      {state.stepHistory.length > 0 && (
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

export default TwoSumSolution;
