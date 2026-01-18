import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let idx = 0;

const T = input[idx++];

function prize2017(a: number): number {
  if (a === 1) return 500;
  if (2 <= a && a <= 3) return 300;
  if (4 <= a && a <= 6) return 200;
  if (7 <= a && a <= 10) return 50;
  if (11 <= a && a <= 15) return 30;
  if (16 <= a && a <= 21) return 10;
  return 0;
}

function prize2018(b: number): number {
  if (b === 1) return 512;
  if (2 <= b && b <= 3) return 256;
  if (4 <= b && b <= 7) return 128;
  if (8 <= b && b <= 15) return 64;
  if (16 <= b && b <= 31) return 32;
  return 0;
}

let out: string[] = [];
for (let t = 0; t < T; t++) {
  const a = input[idx++];
  const b = input[idx++];
  const totalMan = prize2017(a) + prize2018(b);
  out.push(String(totalMan * 10000));
}

process.stdout.write(out.join("\n"));