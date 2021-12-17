const slidingWindow = require('../utils/slidingWindow');
// const hexTest = 'D2FE28';
const hexTest = 'EE00D40C823060';
const hexLookUp = {
  0: '0000',
  1: '0001',
  2: '0010',
  3: '0011',
  4: '0100',
  5: '0101',
  6: '0110',
  7: '0111',
  8: '1000',
  9: '1001',
  A: '1010',
  B: '1011',
  C: '1100',
  D: '1101',
  E: '1110',
  F: '1111',
}

function hex2bin(hex) {
  return hex
    .split('')
    .map(char => hexLookUp[char])
    .join('');
}

function getBin(bin, end, start = 0) {
  if (!end) {
    return bin.split('').slice(start, bin.length).join('');
  }

  return bin.split('').slice(start, end).join('');
}

function getHeader(bin) {
  const version = parseInt(getBin(bin, 3), 2);
  const typeId = parseInt(getBin(bin, 6, 3), 2);

  return { version, typeId }
}

function parseLiteralValue(packet) {
  const messageBin = getBin(packet.baseBin, undefined, 6);
  const messageValues = [];

  for(const bin of slidingWindow(messageBin.split(''), 0, 5, 5)) {
    messageValues.push(bin.join(''));
  }
  // may need to update if padding equals 5 or more
  const filteredValues = messageValues.filter(value => value.length >= 5);
  const valuesAsBin = filteredValues.map(value => getBin(value, undefined, 1)).join('');
  return parseInt(valuesAsBin, 2);
}

function buildPacket(bin) {
  const output = {
    ...getHeader(bin),
    baseBin: bin,
    subPackets: [],
  }

  return output;
}

function buildSubPackets(basePacket) {
  const lengthTypeIdBitLength = [15, 11];
  const lengthTypeId = lengthTypeIdBitLength[getBin(basePacket.baseBin, 7, 6)];
  console.log(basePacket);
  console.log(lengthTypeId);

  if (lengthTypeId === 11) {
    // TODO fix here
    const numberOfPackets = getBin(basePacket.baseBin, lengthTypeId, 7);
    const temp = parseInt(numberOfPackets, 2)
    console.log({ numberOfPackets, temp });
  } else if (lengthTypeId === 15) {}


  return [];
}

function buildPackets(bin) {
  const output = {
    ...getHeader(bin),
    baseHex: hexTest,
    baseBin: bin,
    subPackets: [],
  }

  if (output.typeId === 4) {
    output.subPackets.push(parseLiteralValue(output))
  } else {
    output.subPackets = buildSubPackets(output);
  }

  return output;
}

function main() {
  const bin = hex2bin(hexTest);
  const output = buildPackets(bin);
  console.log(output);
}

main();
