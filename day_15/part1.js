const fs = require('fs');
const path = require('path');

function getData(filePath) {
  return new Promise((resolve) => {
    const rawData = fs.readFileSync(path.resolve(__dirname, filePath), 'UTF-8');
    const lines = rawData.trim().split(/\r?\n/);
    const output = lines.map(line => line.trim().split(''));

    return resolve(output);
  });
}

async function main() {
  const data = await getData('./test_data.txt');
  const graph = {};
  const start = [0,0];
  const end = [data.length - 1, data[0].length -1];
  console.log({ start, end });

  // getNabouirs();
  // find lowest value and cords
  // add it to the graph
}

main();
