const { readFileAsArray } = require('../utils/loadFileAsArray');
const path = require('path');

const testData = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2',
];

function* parse(data) {
  for (const line of data) {
    const [op, value] = line.split(' ');

    yield { op, value: +value };
  };
}

function puzzle1fn(data) {
  let forword = 0;
  let depth = 0;

  for (const { op, value } of parse(data)) {
    if (op === 'forward') {
      forword += value;
    }

    if (op === 'up') {
      depth -= value;
    }

    if (op === 'down') {
      depth += value;
    }
  } 

  return forword * depth;
}

function puzzle2fn(data) {
  let forword = 0;
  let depth = 0;
  let aim = 0;

  for (const { op, value } of parse(data)) {
    if (op === 'forward') {
      forword += value;
      depth += aim * value;
    }

    if (op === 'up') {
      aim -= value;
    }

    if (op === 'down') {
      aim += value;
    }
  };

  return forword * depth;
}

async function main() {
  const data = await readFileAsArray(path.resolve(__dirname, '../day_2/data.txt'));
  const puzzle1 = puzzle1fn(data);
  const puzzle2 = puzzle2fn(data);

  console.log(`puzzle1 output: ${puzzle1}`);
  console.log(`puzzle2 output: ${puzzle2}`);
}

main();
