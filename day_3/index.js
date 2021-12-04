const path = require('path');
const { readFileAsArray } = require('../utils/loadFileAsArray');

const testData = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
];

function loadBits(data) {
  return data
      .map(line => line
         .split('')
         .map(l => l === '1' ? 1 : 0)
      );
}

function pivotBits(bits) {
    const pivoted = [];
    for (let i = 0; i < bits[0].length; i++) {
        pivoted.push(bits.map(l => l[i]));
    }
    return pivoted;
}

function getMostCommonBits(pivot) {
  return pivot
      .map(bit => bit.reduce((val, b) => {
          if (b === 1) return val + 1;
          else return val - 1;
      }, 0))
      .map(weight => weight >= 0 ? 1 : 0);
}

function puzzle1fn(data) {
  const first = loadBits(data);
  const pivot = pivotBits(first);
  const mcbs = getMostCommonBits(pivot).join('')
  const gammaBits = [];
  const epsilonBits = [];

  for (const bit of mcbs) {
    // The MCB is the gamma bit
    gammaBits.push(bit);

    // The LCB is the epsilon bit.
    // LCB is the opposite of MCB.
    epsilonBits.push(bit == 1 ? 0 : 1);
  }

  // Parse bits into numbers
  const gamma = parseInt(gammaBits.join(''), 2);
  const epsilon = parseInt(epsilonBits.join(''), 2);

  return gamma * epsilon;
}

function temp(array, validation, idxToSearch = 0) {
  if (array.length === 1) return array[0];

  const bits = array.reduce((prev, curr) => {
    if (!curr.length) return prev;

    const bit = curr[idxToSearch];
    return {
      ...prev,
      [bit]: [...prev[bit], curr],
    }
  }, { 0: [], 1: [] });

  const nextArray = validation(bits);


  return temp(nextArray, validation, ++idxToSearch);
}

function puzzle2fn(data) {
  const first = loadBits(data);
  const oxygenValidation = (bits) => {
    if (bits[1].length === bits[0].length) {
      return bits[1];
    }

    return bits[1].length > bits[0].length ? bits[1] : bits[0];
  }

  const co2Validation = (bits) => {
    if (bits[1].length === bits[0].length) {
      return bits[0];
    }

    return bits[0].length < bits[1].length ? bits[0] : bits[1];
  }

  const oxygenRating = parseInt(temp(first, oxygenValidation).join(''), 2);
  const CO2Rating = parseInt(temp(first, co2Validation).join(''), 2);

  return oxygenRating * CO2Rating;
}

async function main() {
  const data = await readFileAsArray(path.resolve(__dirname, '../day_3/data.txt'));
  const puzzle1 = puzzle1fn(data);
  const puzzle2 = puzzle2fn(data)

  console.log(`puzzle 1: ${puzzle1}`);
  console.log(`puzzle 2: ${puzzle2}`);
}

main();
