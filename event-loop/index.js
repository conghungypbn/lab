const { logger: { l, L } } = require('../helper')

const asaw = (...t) => async () => {
  await Promise.resolve(1)
  l(...t)
  return 1
}
const promiseChain = (num, index) => {
  for (let i = 0, p = Promise.resolve(); i < num; i++) p = p.then(L`{greenBright promise chain ${index}.${i + 1}}`)
}
const cbHell = (num, index = 0, cb) => {
  l`{bgWhiteBright callback ${index}}`
  if (index >= num) return
  cb(num, index + 1, cb)
}

const onTick = (count = 0, max = 10) => {
  process.nextTick(() => {
    l`{bgWhite tick: ${count}}`
    if (count >= max) return
    onTick(count + 1, max)
  })
}

l`{red script start...}`

setImmediate(L`{whiteBright setImmediate}`, 0)
setTimeout(L`{whiteBright setTimeout}`, 0);

(async () => {
  await asaw`{blue async/await 1.1}`()
  await asaw`{blue async/await 1.2}`()
})()

asaw`{cyanBright async/await 2.1}`()
asaw`{cyanBright async/await 2.2}`()

promiseChain(4, 1)

Promise.resolve()
  .then(L`{green promise 1.1}`)
  .then(L`{green promise 1.2}`)
  .then(L`{green promise 1.3}`)
  .then(L`{green promise 1.4}`)

asaw`{cyan async/await 3.1}`()
asaw`{cyan async/await 3.2}`()
asaw`{cyan async/await 3.3}`()
asaw`{cyan async/await 3.4}`()

Promise.resolve()
  .then(L`{magenta promise 2.1}`)
  .then(L`{magenta promise 2.2}`)
  .then(L`{magenta promise 2.3}`)
  .then(L`{magenta promise 2.4}`)

cbHell(3, 0, cbHell)

onTick(0, 3)

l`{red script end!!!}`
