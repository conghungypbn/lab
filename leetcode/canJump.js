var canJump = function (nums, start = 0, end = nums.length - 1) {
  if (start >= end) return true;
  if (nums[0] === 0) return false
  const next = nums.findIndex((e, i) => e === 0 && i >= start);
  if (next < 0) return true;
  if (next === end) return nums.some((e, i) => i < next && e >= next - i)
  return canJump(nums, next + 1, end) && nums.some((e, i) => i < next && e > next - i);
};
console.log(canJump([2, 2, 0, 2, 0, 2, 0, 0, 2, 0]))

function jump2 (nums) {
  let furthest = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > furthest) return false;
    furthest = Math.max(furthest, i + nums[i]);
    if (furthest >= nums.length - 1) return true;
  }
  return false
}
