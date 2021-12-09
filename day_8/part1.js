const fs = require('fs');
const path = require('path');

function getData(filePath) {
  return new Promise((resolve) => {
    const rawData = fs.readFileSync(path.resolve(__dirname, filePath), 'UTF-8');
    const lines = rawData.trim().split(/\r?\n/);
    const data = lines.map(line => line.split(' | '));

    return resolve(data);
  });
}

function convertToNumber(signal) {
  if (signal.length === 2) {
    return 1;
  }

  if (signal.length == 3) {
    return 7;
  }

  if (signal.length == 4) {
    return 4;
  }

  if (signal.length == 7) {
    return 8;
  }
}

function convertDataToSignals(data) {
  return data.map((signals) => {
    const o = {};
    const [values] = signals;
    values.split(' ').forEach(v => {
      const key = v.split('').sort().join('');
      o[key] = convertToNumber(v);
    });

    return o;
  });
}

function countUsedNumbers(data, signalsAsNumbers) {
  return data.map((signals, idx) => {
    let count = 0
    const signalSet = signalsAsNumbers[idx];
    const [, numbers] = signals;
    const numbersArr = numbers
      .split(' ')
      .map(number => number.split('').sort().join(''))
    numbersArr.forEach(number => {
      if (signalSet?.[number]) count += 1;
    });
    return count;
  });
}

function sum(arr) {
  return arr.reduce((prev, curr) => prev + curr, 0);
}

async function main() {
  const data = await getData('../day_8/data.txt');
  const signalsAsNumbers = convertDataToSignals(data);
  const count = countUsedNumbers(data, signalsAsNumbers);
  const total = sum(count);
  console.log(`output: ${total}`);
}

main();
