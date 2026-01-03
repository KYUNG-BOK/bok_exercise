import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);

const nValue = BigInt(input[0]);
const kValue = BigInt(input[1]);
const primeMod = Number(input[2]);

function modPow(base: number, exponent: number, mod: number): number {
  let result = 1;
  let current = base % mod;
  let exp = exponent;

  while (exp > 0) {
    if (exp & 1) result = (result * current) % mod;
    current = (current * current) % mod;
    exp >>= 1;
  }
  return result;
}

const factorial: number[] = Array(primeMod).fill(1);
const inverseFactorial: number[] = Array(primeMod).fill(1);

for (let value = 1; value < primeMod; value++) {
  factorial[value] = (factorial[value - 1] * value) % primeMod;
}

inverseFactorial[primeMod - 1] = modPow(factorial[primeMod - 1], primeMod - 2, primeMod);
for (let value = primeMod - 2; value >= 0; value--) {
  inverseFactorial[value] = (inverseFactorial[value + 1] * (value + 1)) % primeMod;
}

function combinationSmall(n: number, k: number): number {
  if (k > n) return 0;
  return (
    factorial[n] *
    inverseFactorial[k] %
    primeMod *
    inverseFactorial[n - k] %
    primeMod
  );
}

function combinationLucas(n: bigint, k: bigint): number {
  const bigPrime = BigInt(primeMod);
  let result = 1;

  let nCurrent = n;
  let kCurrent = k;

  while (nCurrent > BigInt(0) || kCurrent > BigInt(0)) {
    const nDigit = Number(nCurrent % bigPrime);
    const kDigit = Number(kCurrent % bigPrime);

    if (kDigit > nDigit) return 0;

    result = (result * combinationSmall(nDigit, kDigit)) % primeMod;

    nCurrent = nCurrent / bigPrime;
    kCurrent = kCurrent / bigPrime;
  }

  return result;
}

console.log(String(combinationLucas(nValue, kValue)));