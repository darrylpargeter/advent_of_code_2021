const fs = require('fs');
const path = require('path');

const RANGE_MIN = -50;
const RANGE_MAX = 50;

function getRange(rawRange) {
  const [, rangeStr] = rawRange.split('=');
  const [start, end] = rangeStr.split('..');
  const output = [];
  const startOutOfRange = start < RANGE_MIN || start > RANGE_MAX;
  const endOutOfRange = end < RANGE_MIN || end > RANGE_MAX;

  if (startOutOfRange || endOutOfRange) {
    return [];
  }

  for (let i = +start; i <= +end; i += 1) {
    output.push(i);
  }

  return output;
}

function formateState(line) {
  const [state, coords] = line.split(' ');
  const output = { state, nodes: [] };
  const [xRange, yRange, zRange] = coords.split(',');

  const xArr = getRange(xRange);
  const yArr = getRange(yRange);
  const zArr = getRange(zRange);

  xArr.forEach(x => {
    yArr.forEach(y => {
      zArr.forEach(z => {
        output.nodes.push(`${x},${y},${z}`);
      });
    });
  });


  return output;
}

function getData(filePath) {
  return new Promise((resolve) => {
    const rawData = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
    const lines = rawData.trim().split(/\r?\n/);
    const output = lines.map(formateState)

    return resolve(output);
  });
}

async function main() {
  const data = await getData('./data.txt');
  const nodeMap = new Map();

  data.forEach(({ state, nodes }) => {
    nodes.forEach(node => {
      nodeMap.set(node, state);
    });
  });

  const turnedOnNodes = [...nodeMap.values()].reduce((prev, curr) => {
    const value = curr === 'on' ? 1 : 0;
    return prev + value;
  }, 0);

  console.log(`output: ${turnedOnNodes}`);
}

main();
