const fs = require('fs');
const path = require('path');

function getData(filePath) {
  return new Promise((resolve) => {
    const rawData = fs.readFileSync(path.resolve(__dirname, filePath), 'UTF-8');
    const lines = rawData.trim().split(/\r?\n/);
    const martix = lines.map(line => line.split(''));
    return resolve(martix);
  });
}

function* martixParse(martix) {
  for (let row = 0; row < martix.length; row += 1) {
    for(let col = 0; col < martix[row].length; col += 1) {
      const curr = +martix[row][col];
      const above = +martix?.[row - 1]?.[col];
      const below = +martix?.[row + 1]?.[col];
      const left = +martix?.[row]?.[col + 1];
      const right = +martix?.[row]?.[col - 1];
      const adjacent = [above, below, left, right].filter(num => !Number.isNaN(num)).sort();

      yield { curr, adjacent };
    }
  }

  return;
}

function getLowestPoints(martix) {
  const output = [];

  for(const { curr, adjacent } of martixParse(martix)) {
    const minAdjacentValue = Math.min.apply(Math, adjacent);
    if (curr < minAdjacentValue) output.push(curr);
  }

  return output;
}

function getRiskLevels(lowestPoints) {
  return lowestPoints.map(point => point + 1);
}

function sum(array) {
  return array.reduce((prev, curr) => prev + curr, 0);
}

async function main() {
  const data = await getData('../day_9/data.txt');
  const lowestPoints = getLowestPoints(data);
  const riskLevels = getRiskLevels(lowestPoints);
  const total = sum(riskLevels);
  console.log(`output: ${total}`);
}

main();
