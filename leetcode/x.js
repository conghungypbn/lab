const fs = require('fs');
const axios = require('axios');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}
/*
 * Complete the 'getRelevantFoodOutlets' function below.
 *
 * URL for cut and paste
 * https://jsonmock.hackerrank.com/api/food_outlets?city=<city>&page=<pageNumber>
 *
 * The function is expected to return an array of strings.
 *
 * The function accepts a city argument (String) and maxCost argument(Integer).
 */

async function getRelevantFoodOutlets(city, maxCost) {
  const data = []
  for (let pageNumber = 1, total_pages = 1; pageNumber <= total_pages; pageNumber++) {
    const res = await axios.get(`https://jsonmock.hackerrank.com/api/food_outlets?city=${city}&page=${pageNumber}`)

    console.log(res)
    const chunk = res.data
    total_pages = chunk.total_pages
    data.push(...chunk.data)
  }
  return data.filter(e => e.estimated_cost <= maxCost).map(e => e.name)
}

getRelevantFoodOutlets('Seattle', 1000).then(console.log)
