import * as fs from "fs";

const data = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let idx = 0;

const N = Number(data[idx++]);
const w: number[] = new Array(N);
const c: number[] = new Array(N);

for (let i = 0; i < N; i++) {
  const a = Number(data[idx++]);
  const b = Number(data[idx++]);
  w[i] = a - 2;
  c[i] = b;
}

const M = Number(data[idx++]);
const T = M - 1;

const INF = 1e15;
const dp = new Array<number>(T + 1).fill(INF);
dp[0] = 0;

for (let i = 0; i < N; i++) {
  const wi = w[i];
  const ci = c[i];
  if (wi > T) continue;
  for (let t = T; t >= wi; t--) {
    const v = dp[t - wi] + ci;
    if (v < dp[t]) dp[t] = v;
  }
}

console.log(dp[T] >= INF ? "-1" : String(dp[T]));