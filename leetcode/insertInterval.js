/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
function overlap(s, e, s1, e1) {
  return Math.min(e, e1) >= Math.max(s, s1)
}
function merge(s, e, s1, e1) {
  return [Math.min(s, s1), Math.max(e, e1)]
}
var insert = function (intervals, newInterval) {
  const r = []
  const [s, e] = newInterval
  let done = false
  for (let i = 0; i < intervals.length; i++) {
    const [s1, e1] = intervals[i]
    if (e1 < s || done) r.push(intervals[i])
    else if (overlap(s, e, s1, e1)) {
      let newI = merge(s, e, s1, e1)
      for (let j = i + 1, f = true; j < intervals.length && f; j++) {
        const [s2, e2] = intervals[j]
        if (newI[1] < s2) f = false
        else if (overlap(newI[0], newI[1], s2, e2)) {
          newI = merge(newI[0], newI[1], s2, e2)
          i++
        }
      }
      r.push(newI)
      done = true
    } else {
      r.push(newInterval, intervals[i])
      done = true
    }
    // console.log('xxxxxxxxxxx')
  }
  if (!done) r.push(newInterval)
  return r
};
