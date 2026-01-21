import * as fs from "fs";

const arr = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let i = 0;

const N = Number(arr[i++]);
const M = Number(arr[i++]);

type Edge = { u: number; v: number; w: number };
const edges: Edge[] = new Array(M);

for (let k = 0; k < M; k++) {
  const u = Number(arr[i++]);
  const v = Number(arr[i++]);
  const w = Number(arr[i++]);
  edges[k] = { u, v, w };
}

const INF = 1e18;
const dist: number[] = new Array(N + 1).fill(INF);
dist[1] = 0;

for (let iter = 1; iter <= N - 1; iter++) {
  let updated = false;
  for (let k = 0; k < M; k++) {
    const { u, v, w } = edges[k];
    if (dist[u] === INF) continue;
    const nd = dist[u] + w;
    if (nd < dist[v]) {
      dist[v] = nd;
      updated = true;
    }
  }
  if (!updated) break;
}

let negCycle = false;
for (let k = 0; k < M; k++) {
  const { u, v, w } = edges[k];
  if (dist[u] === INF) continue;
  if (dist[u] + w < dist[v]) {
    negCycle = true;
    break;
  }
}

if (negCycle) {
  console.log("-1");
} else {
  let out = "";
  for (let v = 2; v <= N; v++) {
    out += (dist[v] === INF ? -1 : dist[v]) + "\n";
  }
  process.stdout.write(out);
}