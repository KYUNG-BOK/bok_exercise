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
const K = readInt();

const S = new Array<number>(N + 1);
S[0] = 0;
for (let i = 1; i <= N; i++) S[i] = S[i - 1] + readInt();

const dp = new Array<number>(N + 1);
dp[0] = 0;

const val = new Array<number>(N + 1);
val[0] = 0;

const dq = new Int32Array(N + 1);
let head = 0, tail = 0;

dq[tail++] = 0;

for (let i = 1; i <= N; i++) {
  const minT = i - K;
  while (head < tail && dq[head] < minT) head++;

  const best = val[dq[head]];
  const pick = S[i] + best;
  dp[i] = dp[i - 1] > pick ? dp[i - 1] : pick;

  val[i] = dp[i - 1] - S[i];

  while (head < tail && val[dq[tail - 1]] <= val[i]) tail--;
  dq[tail++] = i;
}

process.stdout.write(String(dp[N]));