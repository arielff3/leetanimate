export const SPEED_OPTIONS = {
  SLOW: 2000,
  NORMAL: 1000,
  FAST: 500
};

export const PREDEFINED_EXAMPLES = [
  {
    nums: [2, 7, 11, 15],
    target: 9,
    id: 1
  },
  {
    nums: [3, 2, 4],
    target: 6,
    id: 2
  },
  {
    nums: [1, 4, 9, 11, 12, 14, 15, 17],
    target: 31,
    id: 3
  },
  {
    nums: [1, 2, 3, 4],
    target: 10,
    id: 4
  }
];

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