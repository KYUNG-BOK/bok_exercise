// 일주일동안,, 힘들었습니다. 이젠 통과시켜주세여 ㅠ-ㅠ

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

function modPow(a: number, e: number, mod: number): number {
  let r = 1 % mod;
  a %= mod;
  while (e > 0) {
    if (e & 1) r = (r * a) % mod;
    a = (a * a) % mod;
    e = Math.floor(e / 2);
  }
  return r;
}

function prep(pv: number) {
  const fact = new Int32Array(pv);
  const invFact = new Int32Array(pv);
  fact[0] = 1;
  for (let i = 1; i < pv; i++) fact[i] = (fact[i - 1] * i) % pv;
  invFact[pv - 1] = modPow(fact[pv - 1], pv - 2, pv);
  for (let i = pv - 2; i >= 0; i--) invFact[i] = (invFact[i + 1] * (i + 1)) % pv;
  return { p: pv, fact, invFact };
}

function lucas(n: number, k: number, P: { p: number; fact: Int32Array; invFact: Int32Array }): number {
  if (k < 0 || k > n) return 0;
  const p = P.p;
  const fact = P.fact;
  const invFact = P.invFact;
  let res = 1;
  while (n > 0 || k > 0) {
    const ni = n % p;
    const ki = k % p;
    if (ki > ni) return 0;
    let t = fact[ni];
    t = (t * invFact[ki]) % p;
    t = (t * invFact[ni - ki]) % p;
    res = (res * t) % p;
    n = Math.floor(n / p);
    k = Math.floor(k / p);
  }
  return res;
}

const MOD = 100007;
const P1 = prep(97);
const P2 = prep(1031);
const inv97_mod1031 = modPow(97, 1031 - 2, 1031);

function crt(r1: number, r2: number): number {
  let t = (r2 - r1) % 1031;
  if (t < 0) t += 1031;
  t = (t * inv97_mod1031) % 1031;
  return (r1 + 97 * t) % MOD;
}

const T = readInt();
const out: string[] = [];

for (let tc = 0; tc < T; tc++) {
  const N = readInt();
  const M = readInt();

  let ans = 0;

  if (M === 1) {
    ans = (N === 0) ? 1 : 0;
  } else {
    const parts = M - 1;
    if (N < parts) ans = 0;
    else {
      const n = N - 1;
      const k = M - 2;
      const r1 = lucas(n, k, P1);
      const r2 = lucas(n, k, P2);
      ans = crt(r1, r2);
    }
  }

  out.push(String(ans));
}

process.stdout.write(out.join("\n"));