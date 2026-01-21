import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0;

const n = Number(input[p++]);
const m = Number(input[p++]);

const INF = 1e15;
const dist: number[][] = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(INF));

for (let i = 1; i <= n; i++) dist[i][i] = 0;

for (let i = 0; i < m; i++) {
  const a = Number(input[p++]);
  const b = Number(input[p++]);
  const c = Number(input[p++]);
  if (c < dist[a][b]) dist[a][b] = c;
}

for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    const dik = dist[i][k];
    if (dik === INF) continue;
    for (let j = 1; j <= n; j++) {
      const v = dik + dist[k][j];
      if (v < dist[i][j]) dist[i][j] = v;
    }
  }
}

let out = "";
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    out += (dist[i][j] === INF ? 0 : dist[i][j]) + (j === n ? "\n" : " ");
  }
}
process.stdout.write(out);