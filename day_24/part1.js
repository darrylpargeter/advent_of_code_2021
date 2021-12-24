const fs = require('fs');
const path = require('path');

function getData(filePath) {
  return new Promise((resolve) => {
    const rawData = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
    const lines = rawData.trim().split(/\r?\n/);

    return resolve(lines);
  });
}

function parseOp(rawOp) {
  return rawOp.split(' ')
}

function* parseOps(opList) {
  const vars = {
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  }

  while (opList.length) {
    const [op, a, b] = parseOp(opList.shift());
    console.log({op, a, b });
    const aVal = vars?.[a] ?? a;
    const bVal = vars?.[b] ?? b;

    switch(op) {
      case 'inp': {
        const newVar = yield;
        console.log(`setting ${a} to ${newVar}`);
        vars[a] = newVar;
        break;
      }
      case 'mul': {
        vars[a] = aVal * bVal;
        break;
      }
      case 'eql': {
        vars[a] = aVal === bVal ? 1 : 0;
        break;
      }
    }
    console.log({ vars });
  }
}

function loopGen(items, inputArr) {
  const nextInput = inputArr.shift();
  const item = items.next(nextInput);
  // doStuff(item);

  if (!item.done) {
      loopGen(items, inputArr);
  }
}

async function main() {
  const data = await getData('./test_data.txt');
  const gen = parseOps(data);

  loopGen(gen, [0, 3, 9]);
}

main();
