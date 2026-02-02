import * as fs from "fs";

const [Ns, As] = fs.readFileSync(0, "utf8").trim().split(/\s+/);
const N = BigInt(Ns);
const A = BigInt(As);

const ZERO = BigInt(0);
const ONE = BigInt(1);
const NEG_ONE = BigInt(-1);

const addInv = (N - A) % N;

function egcd(a: bigint, b: bigint): [bigint, bigint, bigint] {
  let x0 = ONE, y0 = ZERO;
  let x1 = ZERO, y1 = ONE;

  while (b !== ZERO) {
    const q = a / b;

    const na = b;
    const nb = a - q * b;
    a = na; b = nb;

    const nx0 = x1;
    const nx1 = x0 - q * x1;
    x0 = nx0; x1 = nx1;

    const ny0 = y1;
    const ny1 = y0 - q * y1;
    y0 = ny0; y1 = ny1;
  }

  return [a, x0, y0];
}

const [g, x] = egcd(A, N);

let mulInv = NEG_ONE;
if (g === ONE) {
  mulInv = x % N;
  if (mulInv < ZERO) mulInv += N;
}

process.stdout.write(addInv.toString() + " " + mulInv.toString());