export const CODE_EXAMPLES = {
  twopointers: {
    javascript: `function reverseString(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Swap elements
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }

  return s;
}`,
    python: `def reverseString(s):
    left, right = 0, len(s) - 1

    while left < right:
        # Swap elements
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1

    return s`
  },
  builtin: {
    javascript: `function reverseString(s) {
  return s.reverse();
}`,
    python: `def reverseString(s):
    return s.reverse()`
  }
};
