// @ts-nocheck
const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim();
const numberToFactor = BigInt(input);

const ZERO = 0n;
const ONE = 1n;
const TWO = 2n;
const THREE = 3n;

function gcd(a, b) {
  while (b !== ZERO) {
    const temp = a % b;
    a = b;
    b = temp;
  }
  return a >= ZERO ? a : -a;
}

function modPow(base, exponent, mod) {
  let result = ONE;
  let currentBase = base % mod;
  let currentExponent = exponent;

  while (currentExponent > ZERO) {
    if (currentExponent & ONE) result = (result * currentBase) % mod;
    currentBase = (currentBase * currentBase) % mod;
    currentExponent >>= ONE;
  }
  return result;
}

function absoluteDifference(a, b) {
  return a >= b ? a - b : b - a;
}

// deterministic bases for < 2^64
const MILLER_RABIN_BASES = [
  2n, 325n, 9375n, 28178n, 450775n, 9780504n, 1795265022n,
];

function isPrime(candidate) {
  if (candidate < TWO) return false;

  const smallPrimes = [2n,3n,5n,7n,11n,13n,17n,19n,23n,29n,31n,37n];
  for (const prime of smallPrimes) {
    if (candidate === prime) return true;
    if (candidate % prime === ZERO) return false;
  }

  let oddPart = candidate - ONE;
  let powerOfTwoCount = 0;
  while ((oddPart & ONE) === ZERO) {
    oddPart >>= ONE;
    powerOfTwoCount++;
  }

  witnessLoop: for (const base of MILLER_RABIN_BASES) {
    const a = base % candidate;
    if (a === ZERO) continue;

    let value = modPow(a, oddPart, candidate);
    if (value === ONE || value === candidate - ONE) continue;

    for (let i = 1; i < powerOfTwoCount; i++) {
      value = (value * value) % candidate;
      if (value === candidate - ONE) continue witnessLoop;
    }
    return false;
  }
  return true;
}

const MASK_64BIT = (ONE << 64n) - ONE;
let randomState = (0x1234567890ABCDEFn ^ (numberToFactor & MASK_64BIT)) & MASK_64BIT;

function nextRandom() {
  randomState = (randomState + 0x9E3779B97F4A7C15n) & MASK_64BIT;
  let z = randomState;
  z = ((z ^ (z >> 30n)) * 0xBF58476D1CE4E5B9n) & MASK_64BIT;
  z = ((z ^ (z >> 27n)) * 0x94D049BB133111EBn) & MASK_64BIT;
  return (z ^ (z >> 31n)) & MASK_64BIT;
}

function randomBetween(min, max) {
  return min + (nextRandom() % (max - min + ONE));
}

function pollardRho(number) {
  if (number % TWO === ZERO) return TWO;
  if (number % THREE === ZERO) return THREE;

  while (true) {
    const constant = randomBetween(ONE, number - ONE);
    let currentValue = randomBetween(ONE, number - ONE);

    const polynomial = (value) => (value * value + constant) % number;

    let greatestCommonDivisor = ONE;
    let cycleLength = 1;
    const batchSize = 128;

    let batchProduct = ONE;
    let cycleStartValue = currentValue;
    let savedValue = currentValue;

    while (greatestCommonDivisor === ONE) {
      cycleStartValue = currentValue;

      for (let i = 0; i < cycleLength; i++) {
        currentValue = polynomial(currentValue);
      }

      let processedCount = 0;
      while (processedCount < cycleLength && greatestCommonDivisor === ONE) {
        savedValue = currentValue;
        const limit = Math.min(batchSize, cycleLength - processedCount);

        for (let i = 0; i < limit; i++) {
          currentValue = polynomial(currentValue);
          batchProduct =
            (batchProduct * absoluteDifference(cycleStartValue, currentValue)) % number;
        }

        greatestCommonDivisor = gcd(batchProduct, number);
        processedCount += limit;
      }

      cycleLength <<= 1;
    }

    if (greatestCommonDivisor === number) {
      do {
        savedValue = polynomial(savedValue);
        greatestCommonDivisor = gcd(
          absoluteDifference(savedValue, cycleStartValue),
          number
        );
      } while (greatestCommonDivisor === ONE);
    }

    if (greatestCommonDivisor !== number) return greatestCommonDivisor;
  }
}

const primeFactors = [];

function factorize(value) {
  if (value === ONE) return;
  if (isPrime(value)) {
    primeFactors.push(value);
    return;
  }
  const divisor = pollardRho(value);
  factorize(divisor);
  factorize(value / divisor);
}

factorize(numberToFactor);
primeFactors.sort((a, b) => (a < b ? -1 : 1));

let output = "";
for (const factor of primeFactors) output += factor.toString() + "\n";
process.stdout.write(output);

// 정답 가즈아
