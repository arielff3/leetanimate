// Configurações de velocidade da animação
export const SPEED_OPTIONS = {
  SLOW: 2000,
  NORMAL: 1000,
  FAST: 500
};

// Exemplos pré-definidos
export const PREDEFINED_EXAMPLES = [
  {
    nums: [2, 7, 11, 15],
    target: 9,
    label: "Exemplo 1: [2,7,11,15], target=9"
  },
  {
    nums: [3, 2, 4],
    target: 6,
    label: "Exemplo 2: [3,2,4], target=6"
  },
  {
    nums: [1, 4, 9, 11, 12, 14, 15, 17],
    target: 31,
    label: "Exemplo 3: [1,4,9,11,12,14,15,17], target=31"
  },
  {
    nums: [1, 2, 3, 4],
    target: 10,
    label: "Exemplo 4: [1,2,3,4], target=10 (sem solução)"
  }
];

// Estados iniciais
export const INITIAL_STATE = {
  isPlaying: false,
  currentStep: 0,
  speed: SPEED_OPTIONS.NORMAL,
  nums: [1, 4, 9, 11, 12, 14, 15, 17],
  target: 31,
  hashMap: new Map(),
  currentIndex: -1,
  complement: null,
  foundSolution: null,
  isComplete: false,
  noSolution: false,
  leftPointer: -1,
  rightPointer: -1,
  sortedNums: [],
  originalIndices: [],
  errors: {},
  isValidating: false
}; 