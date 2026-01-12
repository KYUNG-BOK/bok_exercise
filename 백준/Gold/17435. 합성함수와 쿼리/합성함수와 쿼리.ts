import * as fs from "fs";

const rawInput = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let cursor = 0;

const elementCount: number = Number(rawInput[cursor++]);

let maxLog: number = 0;
while ((1 << maxLog) <= 500000) {
  maxLog++;
}

const jumpTable: Int32Array[] = Array.from({ length: maxLog }, () => {
  return new Int32Array(elementCount + 1);
});

for (let element = 1; element <= elementCount; element++) {
  jumpTable[0][element] = Number(rawInput[cursor++]);
}

for (let level = 1; level < maxLog; level++) {
  const previousLevel = level - 1;
  const previousRow = jumpTable[previousLevel];
  const currentRow = jumpTable[level];

  for (let element = 1; element <= elementCount; element++) {
    const middle = previousRow[element];
    currentRow[element] = previousRow[middle];
  }
}

const queryCount: number = Number(rawInput[cursor++]);
const answers: string[] = [];

for (let queryIndex = 0; queryIndex < queryCount; queryIndex++) {
  let exponent: number = Number(rawInput[cursor++]);
  let currentValue: number = Number(rawInput[cursor++]);

  let level: number = 0;
  while (exponent > 0) {
    if (exponent & 1) {
      currentValue = jumpTable[level][currentValue];
    }
    exponent >>= 1;
    level++;
  }

  answers.push(String(currentValue));
}

console.log(answers.join("\n"));