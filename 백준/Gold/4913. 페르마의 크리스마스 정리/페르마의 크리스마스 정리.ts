import * as fs from "fs";

const data = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let index = 0;

const MAX_ABS = 1_000_000;
const MAX_N = MAX_ABS;

const isPrime = new Array<boolean>(MAX_N + 1).fill(true);
isPrime[0] = false;
isPrime[1] = false;

for (let p = 2; p * p <= MAX_N; p++) {
  if (!isPrime[p]) continue;
  for (let multiple = p * p; multiple <= MAX_N; multiple += p) {
    isPrime[multiple] = false;
  }
}

const primePrefix = new Int32Array(MAX_N + 1);
const sumOfTwoSquaresPrimePrefix = new Int32Array(MAX_N + 1);

for (let value = 0; value <= MAX_N; value++) {
  primePrefix[value] = (value === 0 ? 0 : primePrefix[value - 1]);
  sumOfTwoSquaresPrimePrefix[value] =
    (value === 0 ? 0 : sumOfTwoSquaresPrimePrefix[value - 1]);

  if (value >= 2 && isPrime[value]) {
    primePrefix[value]++;

    if (value === 2 || (value % 4 === 1)) {
      sumOfTwoSquaresPrimePrefix[value]++;
    }
  }
}

function clampToRange(v: number): number {
  if (v < 0) return 0;
  if (v > MAX_N) return MAX_N;
  return v;
}

function rangeCount(prefix: Int32Array, left: number, right: number): number {
  if (right < 0 || left > MAX_N) return 0;

  const l = clampToRange(left);
  const r = clampToRange(right);
  if (l > r) return 0;

  return prefix[r] - (l > 0 ? prefix[l - 1] : 0);
}

let output = "";

while (index < data.length) {
  const L = Number(data[index++]);
  const U = Number(data[index++]);

  if (L === -1 && U === -1) break;

  const primeCount = rangeCount(primePrefix, L, U);
  const sumOfTwoSquaresPrimeCount = rangeCount(sumOfTwoSquaresPrimePrefix, L, U);

  output += `${L} ${U} ${primeCount} ${sumOfTwoSquaresPrimeCount}\n`;
}

process.stdout.write(output);
