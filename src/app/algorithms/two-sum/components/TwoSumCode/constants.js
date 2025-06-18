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

// Exemplo de uso:
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

# Exemplo de uso:
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

// Exemplo de uso:
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

# Exemplo de uso:
# nums = [2, 7, 11, 15]
# target = 9
# print(twoSum(nums, target))  # [0, 1]`;

// Explanations for each method
export const algorithmExplanations = {
  hashmap: {
    title: "Hash Map (Uma Passada)",
    description: "Esta solução utiliza um hash map para armazenar os números já visitados e seus índices. Para cada elemento, calculamos o complemento (target - elemento atual) e verificamos se ele já existe no hash map.",
    complexity: {
      time: "O(n) - onde n é o número de elementos no array",
      space: "O(n) - no pior caso, armazenamos todos os elementos no hash map"
    },
    steps: [
      "Criar um hash map vazio",
      "Para cada elemento no array:",
      "• Calcular o complemento (target - elemento atual)",
      "• Se o complemento existir no hash map, retornar os índices",
      "• Caso contrário, adicionar o elemento atual e seu índice ao hash map",
      "Continuar até encontrar a solução"
    ]
  },
  twopointers: {
    title: "Two Pointers",
    description: "Esta solução primeiro cria um array com os valores e seus índices originais, depois ordena por valor. Usa dois ponteiros: um no início (left) e outro no fim (right). Move os ponteiros baseado na soma atual comparada com o target.",
    complexity: {
      time: "O(n log n) - devido à ordenação do array",
      space: "O(n) - para armazenar o array com índices originais"
    },
    steps: [
      "Criar array com valores e índices originais",
      "Ordenar o array por valor",
      "Inicializar ponteiros left=0 e right=length-1",
      "Enquanto left < right:",
      "• Se soma == target: retornar índices originais",
      "• Se soma < target: mover left para direita",
      "• Se soma > target: mover right para esquerda"
    ]
  }
}; 