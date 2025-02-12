/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let profit = 0
  let bot = prices[0]
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > bot) {
      profit += prices[i] - bot
    }

    bot = prices[i]
  }
  return profit
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]))
