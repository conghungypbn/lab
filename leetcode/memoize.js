/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  const rKey = Symbol('result')
  const cache = new Map()
  return function (...args) {
    if (args.length === 0) {
      if (cache.has(rKey)) return cache.get(rKey)
      cache.set(rKey, fn(...args))
      return cache.get(rKey)
    }
    const v = args.reduce((x, e, i) => {
      if (i === args.length - 1) {
        if (!x.has(e)) {
          const r = (x.set(e, new Map()), x.get(e))
          r.set(rKey, fn(...args))
          return r.get(rKey)
        }
        const r = x.get(e)
        if (r.has(rKey)) return r.get(rKey)
        r.set(rKey, fn(...args))
        return r.get(rKey)
      }
      if (!x.has(e)) x.set(e, new Map())
      return x.get(e)
    }, cache)
    // console.log(cache)
    return v
  }
}


/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */
