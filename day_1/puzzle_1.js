const { readFileAsArray } = require('../utils/loadFileAsArray');
const slidingWindow = require('../utils/slidingWindow');
const path = require('path');

const testData = [
  199,
  200,
  208,
  210,
  200,
  207,
  240,
  269,
  260,
  263,
];

function puzzle1fn(array = [], startingIdx = 0, windowSize = 1) {
  if (array.length < 2) return 0;
  let depthIncrease = 0;
  const gen = slidingWindow(array, startingIdx, windowSize);

  for (const [start, end] of gen) {
    if (+end > +start) {
      depthIncrease += 1;
    }
  }

  return depthIncrease;
}

function puzzle2fn(array = [], startingIdx = 0, windowSize = 1) {
  if (array.length < 2) return 0;
  const gen = slidingWindow(array, startingIdx, windowSize);
  const pairSums = [];

  for (const ele of gen) {
    if (ele.length === 3) {
      pairSums.push(
        ele.reduce((prev, curr) => +prev + +curr, 0)
      );
    }
  }

  return puzzle1fn(pairSums, 0, 2);
}

async function main() {
  const data = await readFileAsArray(path.resolve(__dirname, '../day_1/data.txt'));
  const puzzle1 = puzzle1fn(data, 0, 2);
  const puzzle2 = puzzle2fn(data, 0, 3);

  console.log(`puzzle1 output: ${puzzle1}`);
  console.log(`puzzle2 output: ${puzzle2}`);
};

main();
