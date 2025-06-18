// Hash Map implementations
export const hashMapJavaScript = `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
};

// const nums = [2, 7, 11, 15];
// const target = 9;
// console.log(twoSum(nums, target)); // [0, 1]`;

export const hashMapPython = `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []

# nums = [2, 7, 11, 15]
# target = 9
# print(twoSum(nums, target))  # [0, 1]`;

// Two Pointers implementations
export const twoPointersJavaScript = `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Criar array com índices originais
    const indexedNums = nums.map((num, index) => ({ num, originalIndex: index }));
    
    // Ordenar por valor
    indexedNums.sort((a, b) => a.num - b.num);
    
    let left = 0;
    let right = indexedNums.length - 1;
    
    while (left < right) {
        const sum = indexedNums[left].num + indexedNums[right].num;
        
        if (sum === target) {
            const leftIndex = indexedNums[left].originalIndex;
            const rightIndex = indexedNums[right].originalIndex;
            return [Math.min(leftIndex, rightIndex), Math.max(leftIndex, rightIndex)];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [];
};

// const nums = [2, 7, 11, 15];
// const target = 9;
// console.log(twoSum(nums, target)); // [0, 1]`;

export const twoPointersPython = `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Criar lista com índices originais
    indexed_nums = [(num, i) for i, num in enumerate(nums)]
    
    # Ordenar por valor
    indexed_nums.sort()
    
    left = 0
    right = len(indexed_nums) - 1
    
    while left < right:
        current_sum = indexed_nums[left][0] + indexed_nums[right][0]
        
        if current_sum == target:
            left_index = indexed_nums[left][1]
            right_index = indexed_nums[right][1]
            return [min(left_index, right_index), max(left_index, right_index)]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    
    return []

# nums = [2, 7, 11, 15]
# target = 9
# print(twoSum(nums, target))  # [0, 1]`;

// Function to get algorithm explanations with translations
export const getAlgorithmExplanations = (t) => {
  return {
    hashmap: {
      title: t('twoSum.algorithmExplanations.hashmap.title'),
      description: t('twoSum.algorithmExplanations.hashmap.description'),
      complexity: {
        time: t('twoSum.algorithmExplanations.hashmap.complexity.time'),
        space: t('twoSum.algorithmExplanations.hashmap.complexity.space')
      },
      steps: [
        t('twoSum.algorithmExplanations.hashmap.steps.0'),
        t('twoSum.algorithmExplanations.hashmap.steps.1'),
        t('twoSum.algorithmExplanations.hashmap.steps.2'),
        t('twoSum.algorithmExplanations.hashmap.steps.3'),
        t('twoSum.algorithmExplanations.hashmap.steps.4'),
        t('twoSum.algorithmExplanations.hashmap.steps.5')
      ]
    },
    twopointers: {
      title: t('twoSum.algorithmExplanations.twopointers.title'),
      description: t('twoSum.algorithmExplanations.twopointers.description'),
      complexity: {
        time: t('twoSum.algorithmExplanations.twopointers.complexity.time'),
        space: t('twoSum.algorithmExplanations.twopointers.complexity.space')
      },
      steps: [
        t('twoSum.algorithmExplanations.twopointers.steps.0'),
        t('twoSum.algorithmExplanations.twopointers.steps.1'),
        t('twoSum.algorithmExplanations.twopointers.steps.2'),
        t('twoSum.algorithmExplanations.twopointers.steps.3'),
        t('twoSum.algorithmExplanations.twopointers.steps.4'),
        t('twoSum.algorithmExplanations.twopointers.steps.5'),
        t('twoSum.algorithmExplanations.twopointers.steps.6')
      ]
    }
  };
}; 