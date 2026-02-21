function solution(nums) {
  const pick = nums.length / 2;
  const kinds = new Set(nums).size;
  return Math.min(kinds, pick);
}