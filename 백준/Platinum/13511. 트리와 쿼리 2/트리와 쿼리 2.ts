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

const N = readInt();

const head = new Int32Array(N + 1);
head.fill(-1);
const to = new Int32Array((N - 1) * 2);
const w = new Int32Array((N - 1) * 2);
const next = new Int32Array((N - 1) * 2);

let ei = 0;
function add(u: number, v: number, ww: number) {
  to[ei] = v;
  w[ei] = ww;
  next[ei] = head[u];
  head[u] = ei++;
}

for (let i = 0; i < N - 1; i++) {
  const u = readInt(), v = readInt(), ww = readInt();
  add(u, v, ww);
  add(v, u, ww);
}

const LOG = 32 - Math.clz32(N);
const up: Int32Array[] = Array.from({ length: LOG }, () => new Int32Array(N + 1));
const depth = new Int32Array(N + 1);
depth.fill(-1);
const dist = new BigInt64Array(N + 1);

const q = new Int32Array(N);
let qs = 0, qe2 = 0;
q[qe2++] = 1;
depth[1] = 0;
up[0][1] = 0;
dist[1] = BigInt(0);

while (qs < qe2) {
  const v = q[qs++];
  for (let e = head[v]; e !== -1; e = next[e]) {
    const u = to[e];
    if (depth[u] !== -1) continue;
    depth[u] = depth[v] + 1;
    up[0][u] = v;
    dist[u] = dist[v] + BigInt(w[e]);
    q[qe2++] = u;
  }
}

for (let k = 1; k < LOG; k++) {
  const prev = up[k - 1];
  const cur = up[k];
  for (let v = 1; v <= N; v++) cur[v] = prev[prev[v]];
}

function lift(a: number, steps: number): number {
  let bit = 0;
  while (steps > 0) {
    if (steps & 1) a = up[bit][a];
    steps >>= 1;
    bit++;
  }
  return a;
}

function lca(a: number, b: number): number {
  if (depth[a] < depth[b]) { const t = a; a = b; b = t; }
  a = lift(a, depth[a] - depth[b]);
  if (a === b) return a;
  for (let k = LOG - 1; k >= 0; k--) {
    const ua = up[k][a];
    const ub = up[k][b];
    if (ua !== ub) { a = ua; b = ub; }
  }
  return up[0][a];
}

const M = readInt();
const out: string[] = [];

for (let i = 0; i < M; i++) {
  const t = readInt();
  const u = readInt();
  const v = readInt();
  const L = lca(u, v);

  if (t === 1) {
    const ans = dist[u] + dist[v] - BigInt(2) * dist[L];
    out.push(ans.toString());
  } else {
    const k = readInt();
    const du = depth[u] - depth[L];
    const dv = depth[v] - depth[L];
    const idx = k - 1;

    if (idx <= du) {
      out.push(String(lift(u, idx)));
    } else {
      const rem = du + dv - idx;
      out.push(String(lift(v, rem)));
    }
  }
}

process.stdout.write(out.join("\n"));