const { logger: { l }, timer } = require('../helper')
const COLOR = ['green', 'cyan', 'red', 'whiteBright']

const _cliProgress = require('cli-progress')
const bar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)



/**
 * @param {number} n
 * @param {number[][]} edges
 */
var Graph = function (n, edges) {
  this.nodes = Array(n)
  for (let i = 0; i < n; i++) this.nodes[i] = Array(n)
  this.numOfNode = n
  edges.forEach(([from, to, edgeCost]) => this.addEdge([from, to, edgeCost]))
};

/**
 * @param {number[]} edge
 * @return {void}
 */
Graph.prototype.addEdge = function ([from, to, edgeCost]) {
  if (this.nodes[from][to]) return
  this.nodes[from][to] = edgeCost
};

/**
 * @param {number} node1
 * @param {number} node2
 * @return {number}
 */
Graph.prototype.shortestPath = function (node1, node2, traveled = Array(this.numOfNode), currentDistance = 0, context = { callCount: 0, minFound: -1 }, currentPath = []) {
  context.callCount++
  if (node1 == node2) return 0;
  if (context.minFound > 0 && currentDistance > context.minFound) return -1
  currentPath.push([node2])

  const distances = Object.entries(this.nodes[node1])
    .filter(([to]) => !traveled[to])
    .flatMap(([to, edgeCost]) => {
      const traveledSub = Array.from(traveled)

      traveledSub[node1] = true
      traveledSub[to] = true

      if (context.minFound > 0 && currentDistance + edgeCost > context.minFound) return -1

      const distance = this.shortestPath(to, node2, traveledSub, currentDistance + edgeCost, context)
      if (distance >= 0) return distance + edgeCost
      return -1
    }).filter(e => e >= 0)

  if (!distances.length) return -1
  const result = Math.min(...distances)
  !traveled.some(Boolean) && console.log(`${node1} to ${node2}: ${result}; took ${context.callCount} function calls`)
  if (result < context.minFound) context.minFound = result
  return result ?? -1
};

// const t = [[4, [[0, 2, 5], [0, 1, 2], [1, 2, 1], [3, 0, 3]]], [3, 2], [0, 3], [[1, 3, 4]], [0, 3]]

// var obj = new Graph(4, [[0, 2, 5], [0, 1, 2], [1, 2, 1], [3, 0, 3]])

// console.log(obj.shortestPath(3, 2))
// console.log(obj.shortestPath(0, 3))
// obj.addEdge([1, 3, 4])
// obj.addEdge([3, 1, 4])
// obj.addEdge([0, 3, 4])
// obj.addEdge([1, 0, 4])
// console.log(obj.shortestPath(0, 3))



const func = ["Graph", "addEdge", "shortestPath", "addEdge", "shortestPath", "addEdge", "addEdge", "addEdge", "addEdge", "addEdge", "shortestPath", "shortestPath", "addEdge", "shortestPath", "shortestPath", "shortestPath", "addEdge", "shortestPath", "addEdge", "addEdge", "addEdge", "addEdge", "addEdge", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "addEdge", "shortestPath", "addEdge", "shortestPath", "addEdge", "addEdge", "shortestPath", "addEdge", "shortestPath", "shortestPath", "addEdge", "shortestPath", "shortestPath", "addEdge", "addEdge", "shortestPath", "addEdge", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "addEdge", "shortestPath", "addEdge", "addEdge", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "addEdge", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "addEdge", "addEdge", "addEdge", "addEdge", "addEdge", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "addEdge", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "addEdge", "shortestPath", "shortestPath", "addEdge"]
const params = [[18, [[8, 12, 835881], [6, 1, 886222], [8, 9, 152139], [4, 15, 475979], [5, 15, 903985], [12, 7, 435256], [3, 11, 115877], [14, 2, 669007], [15, 12, 503987], [13, 9, 773256], [2, 13, 643974], [12, 5, 42565], [0, 9, 726934], [9, 8, 369110], [13, 10, 727485], [16, 0, 842868], [0, 13, 836101], [4, 12, 645669], [12, 14, 353649], [0, 1, 501402], [3, 13, 131383], [15, 9, 919433], [13, 11, 652190], [9, 4, 501551], [13, 12, 772479], [13, 1, 602418], [5, 3, 192091], [12, 0, 66326], [8, 4, 841136], [3, 1, 305879], [2, 9, 953806], [6, 13, 690575], [1, 12, 901363], [1, 5, 658225], [0, 2, 751532], [14, 16, 17590], [15, 3, 665278], [2, 8, 784019], [4, 3, 586413], [3, 12, 631462], [5, 13, 360949], [1, 17, 686861], [9, 3, 112100], [4, 1, 159862], [7, 13, 863940], [1, 3, 859524], [10, 6, 795021], [17, 2, 489450], [3, 8, 930965], [4, 10, 573998], [1, 15, 60334], [2, 0, 624060], [8, 6, 708518], [17, 13, 446713], [7, 4, 361258], [14, 5, 489098], [1, 4, 147944], [0, 7, 987717], [6, 5, 518191], [13, 16, 301057], [0, 6, 725177], [3, 17, 515457], [16, 3, 456018], [3, 15, 871393], [11, 14, 584427], [17, 8, 569473], [8, 16, 598786], [8, 1, 961881], [12, 16, 51206], [15, 10, 622641], [10, 14, 573146]]], [[9, 2, 775475]], [12, 0], [[1, 8, 10688]], [16, 16], [[7, 10, 194719]], [[6, 15, 10240]], [[4, 8, 7274]], [[5, 1, 5126]], [[14, 12, 230]], [3, 11], [8, 4], [[13, 8, 126]], [3, 16], [13, 3], [9, 12], [[5, 17, 311469]], [7, 0], [[11, 2, 659004]], [[12, 3, 470391]], [[11, 5, 112]], [[3, 0, 771142]], [[14, 11, 88]], [12, 4], [17, 17], [16, 4], [15, 8], [[9, 6, 176760]], [10, 11], [[17, 9, 293661]], [10, 13], [[9, 12, 54]], [[17, 12, 49]], [4, 2], [[2, 11, 598588]], [5, 17], [5, 10], [[10, 7, 472952]], [0, 15], [2, 3], [[12, 1, 5]], [[9, 16, 147239]], [10, 12], [[6, 3, 337163]], [10, 7], [8, 3], [17, 10], [15, 2], [[1, 13, 362779]], [3, 14], [[8, 17, 112504]], [[16, 2, 2]], [13, 17], [2, 2], [15, 12], [14, 0], [[16, 1, 1]], [11, 6], [0, 9], [12, 5], [0, 15], [[3, 5, 1]], [[6, 14, 1]], [[13, 15, 1]], [[17, 3, 1]], [[8, 2, 1]], [5, 1], [2, 12], [7, 8], [6, 2], [12, 5], [[7, 0, 962638]], [7, 13], [13, 12], [13, 9], [6, 13], [15, 12], [0, 16], [3, 5], [[5, 0, 730643]], [9, 16], [13, 9], [[15, 11, 1]]]
function exe(method, args, context) {
  if (method === "Graph") {
    context.obj = new Graph(...args)
    return context.obj
  }
  return context.obj[method](...args)
}

const context = {}

timer.begin('exe')
// bar.start(params.length - 1, 0)

const limit = 30
params.forEach((args, i) => {
  if (i > limit) return
  const r = exe(func[i], args, context)
  // console.log(r)
  // bar.update(i)
})

// bar.stop()
l`{${COLOR[2]} total time: ${timer.end('exe')}} seconds.`
