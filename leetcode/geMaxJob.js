function getMaximumJobs(n, m, k) {
  // Write your code here
  if (m < n) return 1
  k = Math.max(k, n - k)
  const jobs = new Array(k).fill(1)

  for (let left = m - n; left > 0;) {
    for (let position = k - 1; position > 0 && left > 0; position--) {
      if (jobs[position] === jobs[position - 1] || position === 1) {
        jobs[position]++
        left--
        if ((n - k) >= (k - position)) { left-- }

        console.log(jobs);
        position = k;
      }
      console.log(jobs)
    }
  }
  return jobs[k-1]
}

console.log(getMaximumJobs(5, 11, 5))
