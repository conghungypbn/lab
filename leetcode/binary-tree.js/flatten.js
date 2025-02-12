/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
function preoder(r) {
  if (!r) return []
  return [r, ...preoder(r.left), ...preoder(r.right)]
}
var flatten = function (root) {
  preoder(root).reduce((cur, e) => {
    if (cur) {
      cur.right = e
      cur.left = null
    }
    cur = e
    return cur
  }, null)
  return root
};
