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
const M = readInt();
const C = readInt();
const D = readInt();

const b = new Array<number>(N);
for (let i = 0; i < N; i++) b[i] = readInt();

const prev = new Array<number>(M + 1).fill(0);
const cur = new Array<number>(M + 1).fill(0);

for (let k = 1; k <= M; k++) {
  prev[k] = M - Math.abs(b[0] - k);
}

const W = Math.floor(D / C);

for (let t = 1; t < N; t++) {
  for (let r = 1; r <= C; r++) {
    if (r > M) break;

    const len = Math.floor((M - r) / C) + 1;
    const dq = new Int32Array(len);
    let head = 0, tail = 0;
    let right = -1;

    for (let j = 0; j < len; j++) {
      const wantRight = j + W < len ? j + W : len - 1;
      while (right < wantRight) {
        right++;
        const kk = r + right * C;
        const v = prev[kk];
        while (tail > head) {
          const backIdx = dq[tail - 1];
          const backK = r + backIdx * C;
          if (prev[backK] >= v) break;
          tail--;
        }
        dq[tail++] = right;
      }

      const leftLimit = j - W;
      while (tail > head && dq[head] < leftLimit) head++;

      const bestIdx = dq[head];
      const bestK = r + bestIdx * C;
      const k = r + j * C;
      const gain = M - Math.abs(b[t] - k);
      cur[k] = prev[bestK] + gain;
    }
  }

  let ansTmp = -Infinity;
  for (let k = 1; k <= M; k++) {
    const v = cur[k];
    prev[k] = v;
    if (v > ansTmp) ansTmp = v;
  }
}

let ans = -Infinity;
for (let k = 1; k <= M; k++) {
  if (prev[k] > ans) ans = prev[k];
}

process.stdout.write(String(ans));