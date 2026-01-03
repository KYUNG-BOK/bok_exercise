// 이젠 제발 통과시켜주세여... 가즈아.......................

import * as fs from "fs";

const buffer = fs.readFileSync(0);
let cursor = 0;

function readInt(): number {
  while (cursor < buffer.length && buffer[cursor] <= 32) cursor++;
  let value = 0;
  while (cursor < buffer.length) {
    const code = buffer[cursor];
    if (code <= 32) break;
    value = value * 10 + (code - 48);
    cursor++;
  }
  return value;
}

const areaCount = readInt();

function buildPrimes(limit: number): number[] {
  const isComposite = new Uint8Array(limit + 1);
  const primes: number[] = [];
  for (let i = 2; i <= limit; i++) {
    if (isComposite[i] === 0) {
      primes.push(i);
      const start = i * i;
      if (start <= limit) {
        for (let j = start; j <= limit; j += i) isComposite[j] = 1;
      }
    }
  }
  return primes;
}

const SMALL_PRIME_LIMIT = 2000;
const smallPrimes = buildPrimes(SMALL_PRIME_LIMIT);

const BIG_ONE = BigInt(1);

function modPow(base: bigint, exponent: number, mod: bigint): bigint {
  let result = BIG_ONE;
  let current = base % mod;
  let exp = exponent;

  while (exp > 0) {
    if (exp & 1) result = (result * current) % mod;
    current = (current * current) % mod;
    exp = Math.floor(exp / 2);
  }
  return result;
}

function isPrimeMillerRabin32(n: number): boolean {
  if (n < 2) return false;
  if (n === 2 || n === 3) return true;
  if ((n & 1) === 0) return false;

  let d = n - 1;
  let s = 0;
  while ((d & 1) === 0) {
    d = Math.floor(d / 2);
    s++;
  }

  const bigN = BigInt(n);
  const bigNMinus1 = bigN - BIG_ONE;

  const bases = [2, 3, 5, 7, 11];

  for (const a of bases) {
    if (a >= n) continue;

    let x = modPow(BigInt(a), d, bigN);
    if (x === BIG_ONE || x === bigNMinus1) continue;

    let ok = false;
    for (let r = 1; r < s; r++) {
      x = (x * x) % bigN;
      if (x === bigNMinus1) {
        ok = true;
        break;
      }
    }
    if (!ok) return false;
  }
  return true;
}

const primeCache = new Map<number, boolean>();

function isPrimeFast(candidate: number): boolean {
  const cached = primeCache.get(candidate);
  if (cached !== undefined) return cached;

  if (candidate < 2) return false;
  if (candidate === 2) return true;
  if ((candidate & 1) === 0) return primeCache.set(candidate, false).get(candidate)!;

  for (let i = 0; i < smallPrimes.length; i++) {
    const p = smallPrimes[i];
    if (candidate === p) {
      primeCache.set(candidate, true);
      return true;
    }
    if (candidate % p === 0) {
      primeCache.set(candidate, false);
      return false;
    }
  }

  const result = isPrimeMillerRabin32(candidate);
  primeCache.set(candidate, result);
  return result;
}

let impossibleCount = 0;

for (let i = 0; i < areaCount; i++) {
  const area = readInt();
  const candidate = area * 2 + 1;

  if (isPrimeFast(candidate)) impossibleCount++;
}

process.stdout.write(String(impossibleCount));