"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { useTwoSum } from "@/app/algorithms/two-sum/contexts/TwoSumContext";

export default function TwoSumPreview() {
  const { method } = useTwoSum();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundSolution, setFoundSolution] = useState(null);
  
  // Estados específicos para Two Pointers
  const [leftPointer, setLeftPointer] = useState(-1);
  const [rightPointer, setRightPointer] = useState(-1);
  const [sortedNums, setSortedNums] = useState([]);
  
  const nums = [2, 7, 11, 15];
  const target = 9;

  // Reset preview quando método mudar
  useEffect(() => {
    resetPreview();
  }, [method]);

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        if (method === "hashmap") {
          executeHashMapStep();
        } else {
          executeTwoPointersStep();
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentIndex, leftPointer, rightPointer, method]);

  const executeHashMapStep = () => {
    if (currentIndex === -1) {
      setCurrentIndex(0);
    } else if (currentIndex === 0) {
      setCurrentIndex(1);
    } else if (currentIndex === 1) {
      setFoundSolution([0, 1]);
      setIsPlaying(false);
    }
  };

  const executeTwoPointersStep = () => {
    if (leftPointer === -1) {
      // Inicializar - simular array ordenado [2,7,11,15] já está ordenado
      setSortedNums([2, 7, 11, 15]);
      setLeftPointer(0);
      setRightPointer(3);
    } else if (leftPointer === 0 && rightPointer === 3) {
      // Primeira iteração: 2 + 15 = 17 > 9, mover right
      setRightPointer(2);
    } else if (leftPointer === 0 && rightPointer === 2) {
      // Segunda iteração: 2 + 11 = 13 > 9, mover right
      setRightPointer(1);
    } else if (leftPointer === 0 && rightPointer === 1) {
      // Terceira iteração: 2 + 7 = 9 = target, encontrou!
      setFoundSolution([0, 1]);
      setIsPlaying(false);
    }
  };

  const resetPreview = () => {
    setCurrentIndex(-1);
    setFoundSolution(null);
    setIsPlaying(false);
    setLeftPointer(-1);
    setRightPointer(-1);
    setSortedNums([]);
  };

  const togglePlay = () => {
    if (foundSolution) {
      resetPreview();
    }
    setIsPlaying(!isPlaying);
  };

  const getStatusMessage = () => {
    if (method === "hashmap") {
      if (currentIndex === -1) return "Clique para iniciar (Hash Map)";
      if (currentIndex === 0) return "Verificando nums[0] = 2, procurando complemento 7";
      if (currentIndex === 1) return "Verificando nums[1] = 7, encontrado complemento!";
      if (foundSolution) return "✓ Solução encontrada: [0, 1]";
    } else {
      if (leftPointer === -1) return "Clique para iniciar (Two Pointers)";
      if (leftPointer === 0 && rightPointer === 3) return "L=0, R=3: 2+15=17 > 9, mover R";
      if (leftPointer === 0 && rightPointer === 2) return "L=0, R=2: 2+11=13 > 9, mover R";
      if (leftPointer === 0 && rightPointer === 1) return "L=0, R=1: 2+7=9 = target!";
      if (foundSolution) return "✓ Solução encontrada: [0, 1]";
    }
    return "";
  };

  const displayNums = method === "hashmap" ? nums : sortedNums.length > 0 ? sortedNums : nums;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-dashed border-blue-200 dark:border-blue-800">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Prévia da Animação - {method === "hashmap" ? "Hash Map" : "Two Pointers"}
            </h3>
            <p className="text-sm text-muted-foreground">
              nums = [2, 7, 11, 15], target = {target}
            </p>
          </div>
          
          {/* Array Preview */}
          <div className="flex gap-2 justify-center pt-2">
            {displayNums.map((num, index) => {
              const isCurrentHashMap = method === "hashmap" && currentIndex === index;
              const isLeftPointer = method === "twopointers" && leftPointer === index;
              const isRightPointer = method === "twopointers" && rightPointer === index;
              const isInSolution = foundSolution && foundSolution.includes(index);
              
              return (
                <motion.div
                  key={`${method}-${index}`}
                  className={`
                    w-12 h-12 border-2 rounded-lg flex items-center justify-center font-bold text-sm relative
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
                  {num}
                  {/* Pointer Labels */}
                  {isLeftPointer && (
                    <div className="absolute -top-6 text-xs font-bold text-purple-600">L</div>
                  )}
                  {isRightPointer && (
                    <div className="absolute -top-6 text-xs font-bold text-orange-600">R</div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Status */}
          <div className="text-sm min-h-[20px]">
            {getStatusMessage() && (
              <span className={foundSolution ? "text-green-600 font-medium" : ""}>
                {getStatusMessage()}
              </span>
            )}
          </div>

          {/* Control */}
          <Button onClick={togglePlay} variant="outline" size="sm" className="gap-2">
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {isPlaying ? 'Pausar' : foundSolution ? 'Reiniciar' : 'Executar Prévia'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 