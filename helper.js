const chalk = require('chalk')
const figlet = require('figlet')

const l = (...args) => console.log(chalk(...args))
const L = (...t) => () => l(...t)
require('clear')()
l`{cyan.bold ${figlet.textSync('CongHung Lab')}}`

module.exports = {
  logger: { l, L },
  timer: {
    __pivots: {},
    __groupPivots: {},
    begin (name) {
      if (!this.__pivots[name]) this.__pivots[name] = { start: process.hrtime(), points: [] }
    },
    point (name) {
      if (!this.__pivots[name]) throw new Error(`Đéo có ${name}`)
      const p = process.hrtime(this.__pivots[name].start)
      this.__pivots[name].points.push(p)
      const [sec, nanoSec] = p
      return sec + nanoSec / 1e9
    },
    end (name) {
      const r = this.point(name)
      delete this.__pivots[name]
      return r
    }
  }
}
