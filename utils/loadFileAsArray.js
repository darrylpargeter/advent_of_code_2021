const fs = require('fs');

function readFileAsArray(path) {
  return new Promise((resolve, reject) => {
    try {
      const output = [];
      const data = fs.readFileSync(path, 'UTF-8');

      const lines = data.split(/\r?\n/);

      lines.forEach(line => output.push(line));
      
      return resolve(output);

    } catch (error) {
      return reject(error);
    }
  });
}

module.exports = {
  readFileAsArray,
}
