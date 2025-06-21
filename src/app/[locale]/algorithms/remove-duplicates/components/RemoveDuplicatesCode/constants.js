export const twoPointersJavaScript = `var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;
    
    let unique = 0;
    
    for (let read = 1; read < nums.length; read++) {
        if (nums[unique] !== nums[read]) {
            unique++;
            nums[unique] = nums[read];
        }
    }
    
    return unique + 1;
};`;

export const twoPointersPython = `def removeDuplicates(nums):
    if len(nums) == 0:
        return 0
    
    unique = 0
    
    for read in range(1, len(nums)):
        if nums[unique] != nums[read]:
            unique += 1
            nums[unique] = nums[read]
    
    return unique + 1`;


export const getAlgorithmExplanations = (t) => {
  return {
    twopointers: {
      title: t('removeDuplicates.algorithmExplanations.twopointers.title'),
      description: t('removeDuplicates.algorithmExplanations.twopointers.description'),
      complexity: {
        time: t('removeDuplicates.algorithmExplanations.twopointers.complexity.time'),
        space: t('removeDuplicates.algorithmExplanations.twopointers.complexity.space')
      },
      steps: [
        t('removeDuplicates.algorithmExplanations.twopointers.steps.0'),
        t('removeDuplicates.algorithmExplanations.twopointers.steps.1'),
        t('removeDuplicates.algorithmExplanations.twopointers.steps.2'),
        t('removeDuplicates.algorithmExplanations.twopointers.steps.3'),
        t('removeDuplicates.algorithmExplanations.twopointers.steps.4'),
        t('removeDuplicates.algorithmExplanations.twopointers.steps.5')
      ]
    }
  };
}; 