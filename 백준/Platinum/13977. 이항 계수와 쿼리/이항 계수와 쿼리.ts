import * as fs from "fs";

const MOD = BigInt(1000000007);
const ZERO = BigInt(0);
const ONE = BigInt(1);
const TWO = BigInt(2);

const input = fs.readFileSync(0, "utf8").trimEnd();
let idx = 0;
const L = input.length;

function skip() {
  while (idx < L) {
    const c = input.charCodeAt(idx);
    if (c > 32) break;
    idx++;
  }
}

function nextInt(): number {
  skip();
  let num = 0;
  while (idx < L) {
    const c = input.charCodeAt(idx);
    if (c <= 32) break;
    num = num * 10 + (c - 48);
    idx++;
  }
  return num;
}

function modPow(a0: bigint, e0: bigint): bigint {
  let a = a0 % MOD;
  let e = e0;
  let r = ONE;
  while (e > ZERO) {
    if ((e & ONE) === ONE) r = (r * a) % MOD;
    a = (a * a) % MOD;
    e >>= ONE;
  }
  return r;
}

const M = nextInt();

const Ns = new Int32Array(M);
const Ks = new Int32Array(M);
let maxN = 0;

for (let i = 0; i < M; i++) {
  const n = nextInt();
  const k = nextInt();
  Ns[i] = n;
  Ks[i] = k;
  if (n > maxN) maxN = n;
}

const fac = new Array<bigint>(maxN + 1);
const ifac = new Array<bigint>(maxN + 1);

fac[0] = ONE;
for (let i = 1; i <= maxN; i++) {
  fac[i] = (fac[i - 1] * BigInt(i)) % MOD;
}

ifac[maxN] = modPow(fac[maxN], MOD - TWO);
for (let i = maxN; i >= 1; i--) {
  ifac[i - 1] = (ifac[i] * BigInt(i)) % MOD;
}

let out = "";
for (let i = 0; i < M; i++) {
  const n = Ns[i];
  const k = Ks[i];
  if (k > n) {
    out += "0\n";
    continue;
  }
  const res = (((fac[n] * ifac[k]) % MOD) * ifac[n - k]) % MOD;
  out += res.toString() + "\n";
}

process.stdout.write(out);