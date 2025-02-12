
function getMinLength(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] === arr[i]) {
      arr.splice(i, 2, 0)
      i = 0
    }
    if (arr[i + 1] === arr[i] + 1 || arr[i + 1] === arr[i] - 1) {
      arr.splice(i, 2, 1)
      i = 0
    }
  }
  console.log(arr)
  return arr.length
}


console.log(getMinLength([1,1,3]))
