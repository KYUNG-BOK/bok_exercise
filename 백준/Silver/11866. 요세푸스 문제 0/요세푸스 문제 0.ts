import * as fs from "fs";

const [N, K] = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

const arr: number[] = [];
for (let i = 1; i <= N; i++) arr.push(i);

const out: number[] = [];
let idx = 0;

while (arr.length) {
  idx = (idx + K - 1) % arr.length;
  out.push(arr.splice(idx, 1)[0]);
}

console.log(`<${out.join(", ")}>`); 