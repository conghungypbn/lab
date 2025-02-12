function indexOfMaxInRange(arr, start, end) {
  if (arr.length === 0) return -1;

  let max = arr[start];
  let maxIndex = start;

  for (let i = start; i <= end; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

function calculateAmount(a, startIndex, endIndex, level) {
  let r = 0
  for (let i = startIndex + 1; i < endIndex; i++) {
    r += level - a[i]
  }
  return r
}
var trap1 = function (height, start = 0, end = height.length - 1) {
  if (end - start <= 1) return 0
  const a = height
  const max = indexOfMaxInRange(a, start, end)
  const maxLeft = indexOfMaxInRange(a, start, max - 1)
  const maxRight = indexOfMaxInRange(a, max + 1, end)
  return trap(height, start, maxLeft) + trap(height, maxRight, end)
    + calculateAmount(height, maxLeft, max, Math.min(a[max], a[maxLeft]))
    + calculateAmount(height, max, maxRight, Math.min(a[max], a[maxRight]))
};

const trap = function (a) {
  // console.log(a)
  return a.reduce(([r, lastMax, lastMaxIndex, reserve], e, i) => {
    // console.log(`[${r}, ${lastMax}, ${lastMaxIndex}, ${reserve}]; e: ${e}`)
    if (e < lastMax) {
      // console.log(`++reserve+${lastMax - e}`)
      reserve += lastMax - e
      if (i === a.length - 1) r += trap(a.slice(lastMaxIndex, a.length).reverse())
    } else {
      // console.log(`+${reserve}`)
      r += reserve
      reserve = 0
      lastMax = e
      lastMaxIndex = i
    }
    return [r, lastMax, lastMaxIndex, reserve]
  }, [0, a[0], 0, 0])[0] // [result, lastMax, lastMaxIndex, reserve]
}
