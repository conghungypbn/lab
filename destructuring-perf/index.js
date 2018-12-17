const { logger: { l }, timer } = require('../helper')
const COLOR = ['green', 'cyan', 'red', 'whiteBright']

const _cliProgress = require('cli-progress')
const bar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)

const normalParams = (a, b, c, d, e, f) => a + b + c + d + e + f
const normalRestParams = (...a) => a[0] + a[1] + a[2] + a[3] + a[4] + a[5]
const objectParams = (o) => o.a + o.b + o.c + o.d + o.e + o.f
const desctructObjectParams = ({ a, b, c, d, e, f }) => a + b + c + d + e + f
const desctructArrayParams = ([a, b, c, d, e, f]) => a + b + c + d + e + f
const arrayParams = (a) => a[0] + a[1] + a[2] + a[3] + a[4] + a[5]

const numOfTries = 1e8

timer.begin(normalParams.name)
bar.start(100, 0)
for (let i = 1; i <= numOfTries; i++) {
  normalParams(i, i, i, i, i, i)
  i % (numOfTries / 100) === 0 && bar.update(Math.floor(i / (numOfTries / 100)))
}
bar.stop()
l`{${COLOR[0]} ${normalParams.name} take: ${timer.end(normalParams.name)}} seconds.`

timer.begin(normalRestParams.name)
bar.start(100, 0)
for (let i = 1; i <= numOfTries; i++) {
  normalRestParams(i, i, i, i, i, i)
  i % (numOfTries / 100) === 0 && bar.update(Math.floor(i / (numOfTries / 100)))
}
bar.stop()
l`{${COLOR[0]} ${normalRestParams.name} take: ${timer.end(normalRestParams.name)}} seconds.`

timer.begin(objectParams.name)
bar.start(100, 0)
for (let i = 1; i <= numOfTries; i++) {
  objectParams({ a: i, b: i, c: i, d: i, e: i, f: i })
  i % 1e6 === 0 && bar.update(Math.floor(i / 1e6))
}
bar.stop()
l`{${COLOR[1]} ${objectParams.name} take: ${timer.end(objectParams.name)}} seconds.`

timer.begin(desctructObjectParams.name)
bar.start(100, 0)
for (let i = 1; i <= numOfTries; i++) {
  desctructObjectParams({ a: i, b: i, c: i, d: i, e: i, f: i })
  i % 1e6 === 0 && bar.update(Math.floor(i / 1e6))
}
bar.stop()
l`{${COLOR[1]} ${desctructObjectParams.name} take: ${timer.end(desctructObjectParams.name)}} seconds.`

timer.begin(arrayParams.name)
bar.start(100, 0)
for (let i = 1; i <= numOfTries; i++) {
  arrayParams([i, i, i, i, i, i])
  i % 1e6 === 0 && bar.update(Math.floor(i / 1e6))
}
bar.stop()
l`{${COLOR[2]} ${arrayParams.name} take: ${timer.end(arrayParams.name)}} seconds.`

timer.begin(desctructArrayParams.name)
bar.start(100, 0)
for (let i = 1; i <= numOfTries; i++) {
  desctructArrayParams([i, i, i, i, i, i])
  i % 1e6 === 0 && bar.update(Math.floor(i / 1e6))
}
bar.stop()
l`{${COLOR[2]} ${desctructArrayParams.name} take: ${timer.end(desctructArrayParams.name)}} seconds.`
