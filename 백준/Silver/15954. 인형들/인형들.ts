import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0;

const N = Number(input[p++]);
const K = Number(input[p++]);

const a: number[] = new Array(N);
for (let i = 0; i < N; i++) a[i] = Number(input[p++]);

let best = Infinity;

for (let l = 0; l < N; l++) {
  let mean = 0;
  let m2 = 0;
  let cnt = 0;

  for (let r = l; r < N; r++) {
    cnt++;
    const x = a[r];

    const delta = x - mean;
    mean += delta / cnt;
    const delta2 = x - mean;
    m2 += delta * delta2;

    if (cnt >= K) {
      const variance = m2 / cnt;
      if (variance < best) best = variance;
    }
  }
}

const ans = Math.sqrt(best);
process.stdout.write(ans.toString());