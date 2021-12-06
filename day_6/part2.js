const fs = require('fs');
const path = require('path');

const testData = [3,4,3,1,2];

function getData(filePath) {
  return new Promise((resolve, reject) => {
    const rawData = fs.readFileSync(path.resolve(__dirname, filePath), 'UTF-8');
    return resolve(rawData.trim().split(','));
  });
}

function buildState(data) {
  const defaultState = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };

  const state = data.reduce((prev, curr) => {
    return {
      ...prev,
      [curr]: prev[curr] + 1,
    }
  }, defaultState);
  return state;
}

function loopDays(state, days) {
  if (days === 0) return state;
  const existingFish = Object.values(state);
  const numberOfNewFish = state[0];
  const loopedFish = existingFish.slice(1);
  loopedFish.push(numberOfNewFish);
  loopedFish[6] = numberOfNewFish + loopedFish[6];


  const newState = loopedFish.reduce((prev, curr, idx) => {
    return {
      ...prev,
      [idx]: curr
    }
  }, {});

  return loopDays(newState, --days);
}

async function main() {
  const data = await getData('../day_6/data.txt');
  const state = buildState(data);
  const finalState = loopDays(state, 256);
  const sum = Object.values(finalState).reduce((prev, curr) => prev + curr, 0);
  console.log('output', sum);
}

main();
