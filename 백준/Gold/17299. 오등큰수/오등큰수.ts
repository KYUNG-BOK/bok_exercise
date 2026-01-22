import * as fs from "fs";

const data = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0;

const N = Number(data[p++]);
const A = new Int32Array(N);
const freq = new Int32Array(1_000_001);

for (let i = 0; i < N; i++) {
  const x = Number(data[p++]);
  A[i] = x;
  freq[x]++;
}

const ans = new Int32Array(N);
for (let i = 0; i < N; i++) ans[i] = -1;

const st = new Int32Array(N);
let top = 0;

for (let i = 0; i < N; i++) {
  while (top > 0 && freq[A[st[top - 1]]] < freq[A[i]]) {
    ans[st[--top]] = A[i];
  }
  st[top++] = i;
}

let out = "";
for (let i = 0; i < N; i++) {
  out += ans[i] + (i + 1 === N ? "\n" : " ");
}
process.stdout.write(out);