import * as fs from "fs";

const buf = fs.readFileSync(0);
let p = 0;

function readInt(): number {
  while (p < buf.length && buf[p] <= 32) p++;
  let sign = 1;
  if (buf[p] === 45) { sign = -1; p++; }
  let num = 0;
  while (p < buf.length) {
    const c = buf[p];
    if (c <= 32) break;
    num = num * 10 + (c - 48);
    p++;
  }
  return num * sign;
}

const N = readInt();
const D = readInt();

const K = new Array<number>(N + 1);
for (let i = 1; i <= N; i++) K[i] = readInt();

let size = 1;
while (size < N) size <<= 1;

const seg = new Array<number>(size << 1).fill(-Infinity);

function update(pos: number, value: number) {
  let i = pos + size - 1;
  seg[i] = value;
  i >>= 1;
  while (i >= 1) {
    const a = seg[i << 1];
    const b = seg[i << 1 | 1];
    seg[i] = a > b ? a : b;
    i >>= 1;
  }
}

function query(l: number, r: number): number {
  if (l > r) return -Infinity;
  let left = l + size - 1;
  let right = r + size - 1;
  let res = -Infinity;
  while (left <= right) {
    if (left & 1) { const v = seg[left]; if (v > res) res = v; left++; }
    if (!(right & 1)) { const v = seg[right]; if (v > res) res = v; right--; }
    left >>= 1;
    right >>= 1;
  }
  return res;
}

let ans = -Infinity;

for (let i = 1; i <= N; i++) {
  const l = Math.max(1, i - D);
  const r = i - 1;
  const bestPrev = query(l, r);
  const best = bestPrev > 0 ? bestPrev : 0;
  const dpi = K[i] + best;
  update(i, dpi);
  if (dpi > ans) ans = dpi;
}

process.stdout.write(String(ans));