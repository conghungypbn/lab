const { logger: { l }, timer } = require('../helper')

const COUNT = 1e7
const COLOR = ['green', 'cyan', 'red', 'whiteBright']

function * range (start, end) {
  while (start < end) {
    yield start
    start++
  }
}

(async () => {
  setImmediate(() => l`.........END.............`, 0)

  const blockLoop = ({ color, done, index, numOfTries }) => {
    for (let i = 0, total = 0; i < COUNT ? true : l`{${color} total:${total}}`; i++) total += i
    done(blockLoop, index, numOfTries, color)
    return Promise.resolve(1)
  }

  const nextTickRecursion = ({ color, done, index, numOfTries }) => {
    const count = (max, total = 0, cur = 0) => {
      if (cur < max) {
        process.nextTick(() => count(max, total + cur, ++cur))
        return
      }
      l`{${color} total:${total}}`
      done(nextTickRecursion, index, numOfTries, color)
    }
    count(COUNT)
    return Promise.resolve(1)
  }

  const forOfLoop = ({ color, done, index, numOfTries }) => {
    let total = 0
    for (let i of range(0, COUNT)) total += i
    l`{${color} total:${total}}`
    done(forOfLoop, index, numOfTries, color)
    return Promise.resolve(1)
  }

  l`One by one............`
  const start = (f, count, color) => {
    l`{${color} try ${f.name} ${count}}.`
    timer.begin(`${f.name}.${count}`)
  }
  const onDone = (f, count, time, color) => {
    l`{${color} ${f.name}.${count} took: ${timer.point(`${f.name}.${count}`)} seconds}. RAM: ${process.memoryUsage().heapUsed}`
    if (count >= time - 1) l`{${color}.bold ${time} of blockLoop take ${timer.end(`group.${f.name}`)}}`
  }
  const tryMultipleTimeSync = async (cb, time, count = 0, color = 'white', ...args) => {
    if (count >= time) return Promise.resolve(1)
    const params = { color, done: onDone, index: count, numOfTries: time }
    start(cb, count, color)
    cb(params)
    tryMultipleTimeSync(cb, time, count + 1, color, ...args)
    return Promise.resolve(1)
  }

  const functions = [blockLoop, forOfLoop, nextTickRecursion]

  for (const i in functions) {
    try {
      timer.begin(`group.${functions[i].name}`)
      await tryMultipleTimeSync(functions[i], 7, 0, COLOR[i])
    } catch (e) {
      l`{bgWhite.bold failed ${functions[i].name}:\n${e}}`
    } finally {
      l`........................`
    }
  }
})()
