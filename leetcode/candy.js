const candy = (ratings) => {
  const mins = ratings.map((e, i) => i).filter(i => (ratings[i] <= (ratings[i - 1] ?? Infinity) && ratings[i] <= (ratings[i + 1] ?? Infinity)))

  const numOfCandy = new Array(ratings.length).fill(1)

  mins.forEach(i => {
    for (let b = i - 1, cur = 2; ratings[b] > ratings[b+1]; b--, cur++) {
      numOfCandy[b] = Math.max(cur, numOfCandy[b])
    }
    for (let b = i + 1, cur = 2; ratings[b] > ratings[b-1]; b++, cur++) {
      numOfCandy[b] = Math.max(cur, numOfCandy[b])
    }
  })
  // console.log('  ', ratings.join('.'))
  // console.log('  ', numOfCandy.join('.'))

  return numOfCandy.reduce((sum, f) => sum + f, 0)
}

console.log(candy(
  [0, 1, 2, 5, 3, 2, 7]
))
