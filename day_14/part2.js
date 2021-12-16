const fs = require('fs');
const path = require('path');
const slidingWindow = require('../utils/slidingWindow');

function getData(filePath) {
  return new Promise((resolve) => {
    const rawData = fs.readFileSync(path.resolve(__dirname, filePath), 'UTF-8');
    const lines = rawData.trim().split(/\r?\n/);
    const [polymerTemplate] = lines.slice(0,1);
    const rules =  lines.slice(2).reduce((prev, curr) => {
      const [pair, insertion] = curr.split(' -> ');
      return {
        ...prev,
        [pair]: insertion,
      }
    }, {});

    return resolve({
      polymerTemplate,
      rules,
    });
  });
} 

function performSteps(data, steps = 1, cache = {}) {
  if (steps < 1) return data.polymerTemplate;
  console.log(`step: ${steps}`);

  const polymerTemplateAsArr = data.polymerTemplate.split('');
  const insertionArr = [polymerTemplateAsArr[0]];

  for (const pair of slidingWindow(polymerTemplateAsArr, 0, 2)) {
    const joinedPair = pair.join('')
    if (data.rules?.[joinedPair]) {
      const rule = data.rules[joinedPair];
      insertionArr.push(`${rule}${pair[1]}`);
    }
  }

  const copy = {
    ...data,
    polymerTemplate: insertionArr.join(''),
  }

  return performSteps(copy, --steps);
};

function getCharCount(data) {
  return data.split('').reduce((prev, curr) => ({
      ...prev,
      [curr]: prev?.[curr] ? prev[curr] += 1 : 1,
  }), {});
};


function getMinMax(data) {
  const values = Object.values(data);
  const min = Math.min.apply(Math, values); 
  const max = Math.max.apply(Math, values); 

  return [min, max];
}

async function main() {
  const data = await getData('./test_data.txt');
  const output = performSteps(data, 40);
  const charCount = getCharCount(output);
  const [min, max] = getMinMax(charCount);
  console.log(`output: ${max - min}`);
}

main();
