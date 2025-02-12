const maps = {
  "I": 1,
  "V": 5,
  "X": 10,
  "L": 50,
  "C": 100,
  "D": 500,
  "M": 1000
}
var romanToInt = function (s) {
  // s= s.replace('II', '2').replace('III', '3')
  let cur = 0
  for (let i = s.length - 1, last = 0; i >= 0; i--) {
    const c = maps[s[i]]
    if (c > cur || c === last) cur += c
    else cur -= c
    last = c
    // console.log(cur)
  }
  return cur
};
