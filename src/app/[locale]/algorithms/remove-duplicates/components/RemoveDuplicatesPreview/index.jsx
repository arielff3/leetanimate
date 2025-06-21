"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { useRemoveDuplicates } from "../../contexts/RemoveDuplicatesContext";
import { useTranslations } from "next-intl";

const RemoveDuplicatesPreview = () => {
  const t = useTranslations('removeDuplicates');
  const [isPlaying, setIsPlaying] = useState(false);
  const [uniquePointer, setUniquePointer] = useState(0);
  const [readPointer, setReadPointer] = useState(1);
  const [currentArray, setCurrentArray] = useState([1, 1, 2]);
  const [finalLength, setFinalLength] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  
  const originalNums = [1, 1, 2];

  useEffect(() => {
    resetPreview();
  }, []);

  useEffect(() => {
    if (isPlaying && !isComplete) {
      const timer = setTimeout(() => {
        executeTwoPointersStep();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isPlaying, readPointer, uniquePointer, isComplete]);

  const executeTwoPointersStep = () => {
    if (readPointer >= currentArray.length) {
      setFinalLength(uniquePointer + 1);
      setIsComplete(true);
      setIsPlaying(false);
      return;
    }

    if (currentArray[uniquePointer] !== currentArray[readPointer]) {
      setUniquePointer(prev => prev + 1);
      const newArray = [...currentArray];
      newArray[uniquePointer + 1] = currentArray[readPointer];
      setCurrentArray(newArray);
    }
    
    setReadPointer(prev => prev + 1);
  };



  const resetPreview = () => {
    setUniquePointer(0);
    setReadPointer(1);
    setCurrentArray([...originalNums]);
    setFinalLength(null);
    setIsComplete(false);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isComplete) {
      resetPreview();
    }
    setIsPlaying(!isPlaying);
  };

  const getStatusMessage = () => {
    if (!isPlaying && readPointer === 1 && uniquePointer === 0) {
      return t('preview.status.clickToStart', { method: t('methods.twopointers') });
    }
    if (readPointer === 2 && !isComplete) {
      return t('preview.status.twoPointersStep1');
    }
    if (readPointer === 3 && !isComplete) {
      return t('preview.status.twoPointersStep2');
    }
    if (isComplete) {
      return t('preview.status.twoPointersFinished', { length: finalLength });
    }
    return "";
  };

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-2 border-dashed border-green-200 dark:border-green-800">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {t('preview.title', { method: t('methods.twopointers') })}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('preview.array', { nums: currentArray.join(', ') })}
            </p>
          </div>
          
          <div className="flex gap-2 justify-center pt-2">
            {currentArray.map((num, index) => {
              const isUniquePointer = uniquePointer === index;
              const isReadPointer = readPointer === index;
              const isProcessed = index <= uniquePointer;
              const isInFinalResult = finalLength && index < finalLength;
              
              return (
                <motion.div
                  key={`${index}`}
                  className={`
                    w-12 h-12 border-2 rounded-lg flex items-center justify-center font-bold text-sm relative
                    ${isUniquePointer ? 'border-green-500 bg-green-100 dark:bg-green-900' : 'border-gray-300'}
                    ${isReadPointer ? 'border-blue-500 bg-blue-100 dark:bg-blue-900' : ''}
                    ${isInFinalResult ? 'border-purple-500 bg-purple-100 dark:bg-purple-900' : ''}
                    ${isProcessed && !isInFinalResult ? 'opacity-60' : ''}
                  `}
                  animate={{
                    scale: isUniquePointer || isReadPointer ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {num}
                  {isUniquePointer && (
                    <div className="absolute -top-6 text-xs font-bold text-green-600">unique</div>
                  )}
                  {isReadPointer && (
                    <div className="absolute -top-6 text-xs font-bold text-blue-600">read</div>
                  )}
                  {isInFinalResult && isComplete && (
                    <div className="absolute -bottom-6 text-xs font-bold text-purple-600">✓</div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {finalLength && (
            <div className="text-sm text-purple-600 font-medium">
              {t('solution.finalResult', { length: finalLength })}
            </div>
          )}

          <div className="text-sm min-h-[20px]">
            {getStatusMessage() && (
              <span className={isComplete ? "text-green-600 font-medium" : ""}>
                {getStatusMessage()}
              </span>
            )}
          </div>

          <Button onClick={togglePlay} variant="outline" size="sm" className="gap-2">
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {isPlaying ? t('preview.pause') : isComplete ? t('preview.restart') : t('preview.play')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RemoveDuplicatesPreview; 