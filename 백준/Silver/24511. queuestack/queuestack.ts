// 한번에 가즈아

import * as fs from "fs";

const buf = fs.readFileSync(0);
let p = 0;

function readInt(): number {
  while (p < buf.length && buf[p] <= 32) p++;
  let s = 1;
  if (buf[p] === 45) { s = -1; p++; }
  let n = 0;
  while (p < buf.length) {
    const c = buf[p];
    if (c <= 32) break;
    n = n * 10 + (c - 48);
    p++;
  }
  return n * s;
}

const N = readInt();
const A = new Int8Array(N);
for (let i = 0; i < N; i++) A[i] = readInt();

const qVals: number[] = [];
for (let i = 0; i < N; i++) {
  const b = readInt();
  if (A[i] === 0) qVals.push(b);
}

const M = readInt();

const q = qVals.length;
const out: string[] = [];

if (q === 0) {
  for (let i = 0; i < M; i++) out.push(String(readInt()));
  process.stdout.write(out.join(" "));
} else {
  const cap = q + 1;
  const dq = new Int32Array(cap);
  let head = 0;
  let tail = q;

  for (let i = 0; i < q; i++) dq[i] = qVals[i];

  for (let i = 0; i < M; i++) {
    const x = readInt();

    tail = (tail - 1 + cap) % cap;
    out.push(String(dq[tail]));

    head = (head - 1 + cap) % cap;
    dq[head] = x;
  }

  process.stdout.write(out.join(" "));
}