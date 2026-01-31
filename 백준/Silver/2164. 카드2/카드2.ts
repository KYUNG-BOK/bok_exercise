import * as fs from "fs";

const N = Number(fs.readFileSync(0, "utf8").trim());

const q = new Int32Array(N);
for (let i = 0; i < N; i++) q[i] = i + 1;

let head = 0;
let tail = N;
let size = N;

while (size > 1) {
  head++;
  size--;

  if (size === 1) break;

  q[tail % N] = q[head % N];
  tail++;
  head++;
}

console.log(q[head % N].toString());