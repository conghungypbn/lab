function calcMissing(readings) {
  // Write your code here
  const d = readings.map(e => e.split('\t'))
  // console.log(d)

  function nextLeft(x) {
    for (let i = x - 1; i > 0; i--) {
      if (!d[i][1].includes('Missing')) return +d[i][1]
    }
  }
  function nextRight(x) {
    for (let i = x + 1; i < d.length; i++) {
      if (!d[i][1].includes('Missing')) return +d[i][1]
    }
  }
  const missing = d.map((e, i) => [e, i])
    .filter(([e, i]) => e[1].includes('Missing'))
  // console.log(missing)
  const r = missing.map(([e, i]) => (nextLeft(i) + nextRight(i)) / 2)
  r.forEach(e => console.log(e))
  return r
}
