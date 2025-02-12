/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  // console.log(matrix.map(e => e.join(' ')).join('\n'))
  const a = matrix, r = []
  for (; a.length;) {
    r.push(...(a.shift() || []))
    r.push(...(a.map(e => e?.pop()) || []))
    r.push(...(a.pop()?.reverse() || []))
    r.push(...(a.map(e => e?.shift()).reverse() || []))
  }
  return r.filter(e => e !== undefined)
};
