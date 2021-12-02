const { readFileAsArray } = require('../utils/loadFileAsArray');
const path = require('path');

function findDepthIncrease(array = [], startingIdx = 0, windowSize = 1) {
  if (array.length < 2) return 0;
  const n = array.length - 1;
  let depthIncrease = 0;

  for (let i = startingIdx; i < n; i += 1) {
    const endIdx = i + windowSize;
    if (+array[endIdx] > +array[i]) {
      depthIncrease += 1;
    }
  }

  return depthIncrease;
}

async function main() {
  const data = await readFileAsArray(path.resolve(__dirname, '../day_1/data.txt'));
  const depthIncrease = findDepthIncrease(data, 0, 1);

  console.log(`depth increased: ${depthIncrease} times`);
};

main();
