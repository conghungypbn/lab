var spiralMatrixIII = function (rows, cols, rStart, cStart) {
  const a = []
  const dir = [1, 0, 0, 0] // right, down, left, up
  const maxTravel = Math.max(rows, cols) ** 2
  for (let i = cStart, j = rStart, r = 0, c = 1; a.length <= rows * cols && c <= maxTravel; c++) {
    if (i >= 0 && i < cols && j >= 0 && j < rows) a.push([j, i])
    if (Math.abs(i - cStart) >= r && Math.abs(j - rStart) >= r) {
      console.log('xxxx')
      if (dir[0]) {
        j++
        r++
        c++
        if (i >= 0 && i < cols && j >= 0 && j < rows) a.push([j, i])
      }
      dir.unshift(dir.pop())
    }
    i = i + dir[1] - dir[3]
    j = j + dir[0] - dir[2]

    console.log('--------------', dir, [j, i])
    console.log(a)
  }
  return a
};

console.log(spiralMatrixIII(5, 6, 1, 4))
