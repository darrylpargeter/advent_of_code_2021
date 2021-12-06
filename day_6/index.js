const fs = require('fs');
const path = require('path');

const testData = [3,4,3,1,2];

function loopDays(data, days) {
  if (days === 0) return data;

  let fishArray = [...data];

    const newFish = [];

    const updatedFish = data.map(fish => {
      let updatedTimer = fish - 1;
      if (+fish === 0) {
        newFish.push(8);
        updatedTimer = 6;
      }

      return updatedTimer;
    });

    fishArray = [...updatedFish, ...newFish];

  return loopDays(fishArray, --days);
}

function getData(filePath) {
  return new Promise((resolve, reject) => {
    const rawData = fs.readFileSync(path.resolve(__dirname, filePath), 'UTF-8');
    return resolve(rawData.split(','));
  });
}

async function main() {
  const data = await getData('../day_6/data.txt');
  const puzzle1 = loopDays(data, 80).length;
  // const puzzle2 = loopDays(data, 256).length;
  console.log(`puzzle1 output: ${puzzle1}`);
  // console.log(`puzzle2 output: ${puzzle2}`);
}

main();
