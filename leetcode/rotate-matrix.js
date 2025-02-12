/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const a = matrix
  const n = matrix.length
  for (let i = 0; i < Math.ceil(n / 2); i++) {
    for (let j = 0; j < Math.floor(n / 2); j++) {
      [
        a[i][j],
        a[j][n - 1 - i],
        a[n - 1 - i][n - 1 - j],
        a[n - 1 - j][i]
      ] = [
        a[n - 1 - j][i],
        a[i][j],
        a[j][n - 1 - i],
        a[n - 1 - i][n - 1 - j]
      ]

    }
  }
  return a
};


console.log(rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
