"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, RotateCcw, SkipForward, Settings } from "lucide-react";
import { useTwoSum } from "../../contexts/TwoSumContext";
import { useTranslations } from "next-intl";
import { PREDEFINED_EXAMPLES, INITIAL_STATE, SPEED_OPTIONS } from "./constants";
import { customExampleSchema } from "@/lib/validations";

export default function TwoSumSolution() {
  const { method } = useTwoSum();
  const t = useTranslations('twoSum.solution');
  const tMethods = useTranslations('twoSum.methods');
  const tSpeed = useTranslations('twoSum.solution.speedOptions');
  
  const [state, setState] = useState(INITIAL_STATE);
  const [selectedExample, setSelectedExample] = useState(0);
  const [showCustomization, setShowCustomization] = useState(false);
  const [customInput, setCustomInput] = useState({ nums: "", target: "" });
  const [validationErrors, setValidationErrors] = useState({});

  const resetAnimation = useCallback(() => {
    setState(prev => ({
      ...INITIAL_STATE,
      speed: prev.speed,
      nums: prev.nums,
      target: prev.target
    }));
  }, []);

  useEffect(() => {
    resetAnimation();
  }, [method, resetAnimation]);

  const togglePlay = () => {
    if (state.isComplete) {
      resetAnimation();
    }
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
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
    setState(prev => {
      if (prev.currentIndex >= prev.nums.length - 1) {
        return { ...prev, isComplete: true, isPlaying: false, noSolution: true };
      }

      const nextIndex = prev.currentIndex + 1;
      const currentNum = prev.nums[nextIndex];
      const complement = prev.target - currentNum;
      const newHashMap = new Map(prev.hashMap);

      if (newHashMap.has(complement)) {
        return {
          ...prev,
          foundSolution: [newHashMap.get(complement), nextIndex],
          isComplete: true,
          isPlaying: false,
          currentIndex: nextIndex,
          complement
        };
      }

      newHashMap.set(currentNum, nextIndex);
      return {
        ...prev,
        currentIndex: nextIndex,
        hashMap: newHashMap,
        complement
      };
    });
  };

  const executeTwoPointersStep = () => {
    setState(prev => {
      if (prev.leftPointer === -1) {
        // Initialize two pointers
        const indexedNums = prev.nums.map((num, index) => ({ num, originalIndex: index }));
        const sorted = [...indexedNums].sort((a, b) => a.num - b.num);
        
        return {
          ...prev,
          sortedNums: sorted.map(item => item.num),
          originalIndices: sorted.map(item => item.originalIndex),
          leftPointer: 0,
          rightPointer: sorted.length - 1
        };
      }

      const leftVal = prev.sortedNums[prev.leftPointer];
      const rightVal = prev.sortedNums[prev.rightPointer];
      const sum = leftVal + rightVal;

      if (sum === prev.target) {
        const leftOriginal = prev.originalIndices[prev.leftPointer];
        const rightOriginal = prev.originalIndices[prev.rightPointer];
        return {
          ...prev,
          foundSolution: [Math.min(leftOriginal, rightOriginal), Math.max(leftOriginal, rightOriginal)],
          isComplete: true,
          isPlaying: false
        };
      } else if (sum < prev.target) {
        if (prev.leftPointer >= prev.rightPointer - 1) {
          return { ...prev, isComplete: true, isPlaying: false, noSolution: true };
        }
        return { ...prev, leftPointer: prev.leftPointer + 1 };
      } else {
        if (prev.leftPointer >= prev.rightPointer - 1) {
          return { ...prev, isComplete: true, isPlaying: false, noSolution: true };
        }
        return { ...prev, rightPointer: prev.rightPointer - 1 };
      }
    });
  };

  useEffect(() => {
    if (state.isPlaying && !state.isComplete) {
      const timer = setTimeout(executeStep, state.speed);
      return () => clearTimeout(timer);
    }
  }, [state.isPlaying, state.isComplete, state.currentStep, executeStep, state.speed]);

  const selectExample = (index) => {
    const example = PREDEFINED_EXAMPLES[index];
    setState(prev => ({
      ...INITIAL_STATE,
      nums: example.nums,
      target: example.target,
      speed: prev.speed
    }));
    setSelectedExample(index);
    setShowCustomization(false);
  };

  const applyCustomization = () => {
    try {
      const validation = customExampleSchema.safeParse(customInput);
      
      if (!validation.success) {
        const errors = {};
        validation.error.errors.forEach(error => {
          errors[error.path[0]] = error.message;
        });
        setValidationErrors(errors);
        return;
      }

      setValidationErrors({});
      
      // Parse the validated input
      const nums = customInput.nums.split(',').map(n => parseInt(n.trim()));
      const target = parseInt(customInput.target);
      
      setState(prev => ({
        ...INITIAL_STATE,
        nums,
        target,
        speed: prev.speed
      }));
      
      setSelectedExample(-1); // Custom example
      setShowCustomization(false);
    } catch (error) {
      console.error("Error applying customization:", error);
    }
  };

  const getSpeedLabel = () => {
    switch (state.speed) {
      case SPEED_OPTIONS.SLOW: return t('speedOptions.slow');
      case SPEED_OPTIONS.FAST: return t('speedOptions.fast');
      default: return t('speedOptions.normal');
    }
  };

  const getExampleLabel = (example, index) => {
    return `${t('example')} ${example.id}: [${example.nums.join(',')}], target=${example.target}`;
  };

  const displayNums = method === "twopointers" && state.sortedNums.length > 0 ? state.sortedNums : state.nums;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <Button onClick={togglePlay} className="gap-2">
              {state.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {state.isPlaying ? t('pause') : state.isComplete ? t('restart') : t('execute')}
            </Button>
            
            <Button onClick={nextStep} variant="outline" className="gap-2" disabled={state.isPlaying || state.isComplete}>
              <SkipForward className="h-4 w-4" />
              {t('nextStep')}
            </Button>
            
            <Button onClick={resetAnimation} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              {t('reset')}
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t('speed')}:</span>
              <Select 
                value={state.speed.toString()} 
                onValueChange={(value) => setState(prev => ({ ...prev, speed: parseInt(value) }))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue>{getSpeedLabel()}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SPEED_OPTIONS.SLOW.toString()}>{t('speedOptions.slow')}</SelectItem>
                  <SelectItem value={SPEED_OPTIONS.NORMAL.toString()}>{t('speedOptions.normal')}</SelectItem>
                  <SelectItem value={SPEED_OPTIONS.FAST.toString()}>{t('speedOptions.fast')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={() => setShowCustomization(!showCustomization)} 
              variant="outline" 
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              {t('customize')}
            </Button>
          </div>

          {/* Examples Selection */}
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">{t('predefinedExamples')}</h4>
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

          {/* Customization Panel */}
          {showCustomization && (
            <div className="mt-4 p-4 border rounded-lg bg-muted/50">
              <h4 className="text-sm font-medium mb-3">{t('customization.title')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    {t('customization.arrayLabel')}
                  </label>
                  <Input
                    placeholder="2,7,11,15"
                    value={customInput.nums}
                    onChange={(e) => setCustomInput(prev => ({ ...prev, nums: e.target.value }))}
                    className={validationErrors.nums ? "border-red-500" : ""}
                  />
                  {validationErrors.nums && (
                    <p className="text-xs text-red-500 mt-1">{validationErrors.nums}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    {t('customization.targetLabel')}
                  </label>
                  <Input
                    placeholder="9"
                    value={customInput.target}
                    onChange={(e) => setCustomInput(prev => ({ ...prev, target: e.target.value }))}
                    className={validationErrors.target ? "border-red-500" : ""}
                  />
                  {validationErrors.target && (
                    <p className="text-xs text-red-500 mt-1">{validationErrors.target}</p>
                  )}
                </div>
              </div>
              <Button onClick={applyCustomization} className="mt-3" size="sm">
                {t('customization.apply')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('visualization')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-4">
              {t('array')} nums = {JSON.stringify(state.nums)}, {t('target', { target: state.target })}
            </h3>
            <div className="flex gap-2 justify-center flex-wrap">
              {displayNums.map((num, index) => {
                const isCurrentHashMap = method === "hashmap" && state.currentIndex === index;
                const isLeftPointer = method === "twopointers" && state.leftPointer === index;
                const isRightPointer = method === "twopointers" && state.rightPointer === index;
                const isInSolution = state.foundSolution && 
                  (method === "hashmap" ? 
                    state.foundSolution.includes(index) : 
                    state.foundSolution.includes(state.originalIndices?.[index] || index));
                
                return (
                  <motion.div
                    key={`${method}-${index}`}
                    className={`
                      w-16 h-16 border-2 rounded-lg flex flex-col items-center justify-center relative
                      ${isCurrentHashMap ? 'border-blue-500 bg-blue-100 dark:bg-blue-900' : 'border-gray-300'}
                      ${isLeftPointer ? 'border-purple-500 bg-purple-100 dark:bg-purple-900' : ''}
                      ${isRightPointer ? 'border-orange-500 bg-orange-100 dark:bg-orange-900' : ''}
                      ${isInSolution ? 'border-green-500 bg-green-100 dark:bg-green-900' : ''}
                    `}
                    animate={{
                      scale: isCurrentHashMap || isLeftPointer || isRightPointer ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-lg font-bold">{num}</div>
                    <div className="text-xs text-muted-foreground">
                      [{method === "twopointers" && state.originalIndices ? state.originalIndices[index] : index}]
                    </div>
                    {/* Pointer Labels */}
                    {isLeftPointer && (
                      <div className="absolute -top-6 text-xs font-bold text-purple-600">{t('leftPointer')}</div>
                    )}
                    {isRightPointer && (
                      <div className="absolute -top-6 text-xs font-bold text-orange-600">{t('rightPointer')}</div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">{t('currentStatus')}:</h3>
            <p>{t('algorithmSelected', { method: method === "hashmap" ? tMethods('hashmap') : tMethods('twopointers') })}</p>
            
            {method === "hashmap" && state.currentIndex >= 0 && (
              <p className="mt-1">
                {t('checking')} nums[{state.currentIndex}] = {state.nums[state.currentIndex]}, {t('lookingForComplement')} {state.complement}
              </p>
            )}
            
            {method === "twopointers" && state.leftPointer >= 0 && state.rightPointer >= 0 && (
              <p className="mt-1">
                {t('leftPointer')}={state.leftPointer}, {t('rightPointer')}={state.rightPointer}: {displayNums[state.leftPointer]}+{displayNums[state.rightPointer]}={displayNums[state.leftPointer] + displayNums[state.rightPointer]}
              </p>
            )}
            
            {state.foundSolution && (
              <p className="text-green-600 font-medium mt-2">
                {t('solutionFound', { indices: `${state.foundSolution[0]}, ${state.foundSolution[1]}` })}
              </p>
            )}
            
            {state.noSolution && (
              <p className="text-red-600 font-medium mt-2">
                {t('noSolutionFound')}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 