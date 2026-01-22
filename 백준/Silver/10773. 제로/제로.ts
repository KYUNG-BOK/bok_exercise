import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let idx = 0;

const K = input[idx++];
const stack: number[] = [];
let sum = 0;

for (let i = 0; i < K; i++) {
  const x = input[idx++];
  if (x === 0) {
    sum -= stack.pop()!;
  } else {
    stack.push(x);
    sum += x;
  }
}

console.log(String(sum));