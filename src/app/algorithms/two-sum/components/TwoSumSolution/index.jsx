"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useTwoSum } from "@/app/algorithms/two-sum/contexts/TwoSumContext";

export default function TwoSumSolution() {
  const { method } = useTwoSum();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [nums] = useState([1, 4, 9, 11, 12, 14, 15, 17]);
  const [target] = useState(31);
  const [foundSolution, setFoundSolution] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const resetAnimation = useCallback(() => {
    setCurrentStep(0);
    setCurrentIndex(-1);
    setFoundSolution(null);
    setIsComplete(false);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    resetAnimation();
  }, [method, resetAnimation]);

  const togglePlay = () => {
    if (isComplete) {
      resetAnimation();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Controles da Animação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <Button onClick={togglePlay} className="gap-2">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? 'Pausar' : isComplete ? 'Reiniciar' : 'Executar'}
            </Button>
            
            <Button onClick={resetAnimation} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Resetar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Visualização do Algoritmo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-4">
              Array: nums = {JSON.stringify(nums)}, target = {target}
            </h3>
            <div className="flex gap-2 justify-center flex-wrap">
              {nums.map((num, index) => (
                <motion.div
                  key={`${method}-${index}`}
                  className="w-16 h-16 border-2 rounded-lg flex flex-col items-center justify-center border-gray-300"
                >
                  <div className="text-lg font-bold">{num}</div>
                  <div className="text-xs text-muted-foreground">[{index}]</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Status Atual:</h3>
            <p>Algoritmo {method === "hashmap" ? "Hash Map" : "Two Pointers"} selecionado</p>
            {foundSolution && (
              <p className="text-green-600 font-medium mt-2">
                🎉 Solução encontrada: [{foundSolution[0]}, {foundSolution[1]}]
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 