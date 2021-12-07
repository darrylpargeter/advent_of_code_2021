const fs = require('fs');
const path = require('path');

const testData = [16,1,2,0,4,2,7,1,2,14];

function getData(filePath) {
  return new Promise((resolve, reject) => {
    const rawData = fs.readFileSync(path.resolve(__dirname, filePath), 'UTF-8');
    const stringArr = rawData.split(',');
    return resolve(stringArr.map(n => parseInt(n)));
  });
}

function sum(number) {
  let output = 0;

  for(let i = 0; i <= number; i += 1) {
    output += i;
  }

  return output;
}

function numberDiff(data, diffArr, range) {
  if (range <= 0) return diffArr;

  const newArray = data.map(number => { 
    if (+number > range) return +number - range;
    return range - +number;
  });
  const fuleSpent = newArray.map(number => sum(number));

  const total = fuleSpent.reduce((sum, curr) => sum + curr, 0);

  const newDiffArr = [...diffArr, total]; 
  return numberDiff(data, newDiffArr, --range);
}

async function main() {
  try {
    const data = await getData(path.resolve(__dirname, '../day_7/data.txt'));
    const output = numberDiff(data, [], 2000);
    const minValue = Math.min.apply(Math, output); 
    console.log('puzzle 2: ', minValue);
  } catch(error) {
    console.log(error);
  }
}

main();
