export const SPEED_OPTIONS = {
  SLOW: 2000,
  NORMAL: 1000,
  FAST: 500
};

export const PREDEFINED_EXAMPLES = [
  {
    nums: [1, 1, 2],
    id: 1
  },
  {
    nums: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
    id: 2
  },
  {
    nums: [1, 2, 2, 3, 3, 3, 4, 4, 4, 4],
    id: 3
  },
  {
    nums: [1, 1, 1, 1, 1],
    id: 4
  },
  {
    nums: [-3, -1, 0, 0, 0, 3, 3],
    id: 5
  }
];

export const INITIAL_STATE = {
  isPlaying: false,
  currentStep: 0,
  speed: SPEED_OPTIONS.NORMAL,
  nums: [1, 1, 2],
  uniquePointer: 0,
  readPointer: 1,
  finalLength: null,
  isComplete: false,
  errors: {},
  isValidating: false,
  currentArray: [1, 1, 2],
  stepHistory: [],
  operationCount: 0,
  comparisons: 0,
  writes: 0,
  currentOperation: "",
  detailedStatus: ""
}; 