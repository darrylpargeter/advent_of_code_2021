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

function formatData(data) {
  return data.map(line => {
    const [op, value] = line.split(' ');
    return { op, value: +value };
  });
}

function puzzle1fn(data) {
  let forword = 0;
  let depth = 0;

  data.forEach(item => {
    if (item.op === 'forward') {
      forword += item.value;
    }

    if (item.op === 'up') {
      depth -= item.value;
    }

    if (item.op === 'down') {
      depth += item.value;
    }
  });

  return forword * depth;
}

function puzzle2fn(data) {
  let forword = 0;
  let depth = 0;
  let aim = 0;

  data.forEach(item => {
    if (item.op === 'forward') {
      forword += item.value;
      depth += aim * item.value;
    }

    if (item.op === 'up') {
      aim -= item.value;
    }

    if (item.op === 'down') {
      aim += item.value;
    }
  });

  return forword * depth;
}

async function main() {
  const data = await readFileAsArray(path.resolve(__dirname, '../day_2/data.txt'));
  const formattedData = formatData(data);
  const puzzle1 = puzzle1fn(formattedData);
  const puzzle2 = puzzle2fn(formattedData);

  console.log(`puzzle1 output: ${puzzle1}`);
  console.log(`puzzle2 output: ${puzzle2}`);
}

main();
