var invertTree = function (root) {
  if (!root) return root;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)]
  return root
};
var isSameTree = function (p, q) {
  if (!p && !q) return true
  if (p?.val !== q?.val) return false
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
var maxDepth = function (root) {
  if (!root) return 0
  if (!root.left && !root.right) return 1
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
};
var isSymmetric = function (root) {
  if (!root) return true
  return isSameTree(root.left, invertTree(root.right))
};
var sumNumbers = function (root, currentPath = 0) {
  if (!root) return 0
  const v = 10 * currentPath + root.val
  if (!root.left && !root.right) return v
  return sumNumbers(root.left, v) + sumNumbers(root.right, v)
};
