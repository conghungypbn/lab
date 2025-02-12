
/**
 * @param {number} n
 * @return {number[][]}
 */

var generateMatrix = function(n) {
  const a = []
  const dir = [1, 0 , 0, 0] // right, down, left, up
  let minX=0, maxX=n-1, minY=0, maxY=n-1
  for (let i=0, j=0, c=1; c <= n*n;c++) {
    if (!a[i]) a[i] = []
    a[i][j] = c
    if (
      (i===maxX && dir[1] && maxY--) ||
      (i===minX && dir[3] && ++minY) ||
      (j===maxY && dir[0] && ++minX) ||
      (j===minY && dir[2] && maxX--)
      ) dir.unshift(dir.pop())
    i = i + dir[1] - dir[3]
    j = j + dir[0] - dir[2]

    // console.log('--------------', c, dir, i, j)
    // console.log(`x: ${minX}, ${maxX}; y: ${minY}, ${maxY}`)
    // console.log(a.map(e => e.join(' ')).join('\n'))
  }
  // console.log(a.map(e => e.join(' ')).join('\n'))
  return a
};
