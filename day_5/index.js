const fs = require("fs");
const path = require('path');

function getData(filePath) {
    return new Promise((resolve, reject) => {
        const rawData = fs.readFileSync(path.resolve(__dirname, filePath), 'UTF-8');
        const lines = rawData.trim().split(/\r?\n/);
        const formattedData = lines
            .map(item => item.split(/\s->\s/))
            .reduce((prev, curr) => {
                const [xy1, xy2] = curr;
                return [
                    ...prev,
                    [...xy1.split(','), ...xy2.split(',')],
                ];
            }, [])

        return resolve(formattedData);
    });
}

function filterCoords(coords) {
    return coords.filter(([x1, y1, x2, y2]) => {
        return +x1 === +x2 || +y1 === +y2
    });
}

function getRange([start, end]) {
    const output = [];
    
    for (let i = start; i <= end; i += 1) {
        output.push(i);
    }

    return output;
}

async function main() {
    const data = await getData('../day_5/data.txt');
    const filterData = filterCoords(data);
    let output = {};

    try {
        filterData.forEach(([x1, y1, x2, y2], idx) => {
            console.log(`process: ${idx}/${filterData.length}`);
            const x = [+x1, +x2].sort();
            const y = [+y1, +y2].sort();
            const xRange = getRange(x);
            const yRange = getRange(y);
                
            const arrayToLoop = xRange.length > 1 ? xRange : yRange
            const [staticValue] = xRange.length > 1 ? yRange : xRange

            output = arrayToLoop.reduce((prev, curr) => {
                const coord = xRange.length > 1 ? `${curr}:${staticValue}` : `${staticValue}:${curr}`;
                if (!prev?.[coord]) {
                    return {
                        ...prev,
                        [coord]: 1
                    }
                }

                return {
                    ...prev,
                    [coord]: prev[coord] + 1,
                }
            }, output);
        });

        const sum = Object.values(output).reduce((prev, curr) => curr > 1 ? prev + 1 : prev, 0);
        console.log('sum', sum);
    } catch(error) {
        console.log(error);
    }
}

main();
