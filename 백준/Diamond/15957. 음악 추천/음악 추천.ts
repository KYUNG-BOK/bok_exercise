// 고마해라, 그만 고생시켰으면 ... 보내줘

import * as fs from "fs";

const x = fs.readFileSync(0, "utf8").trimEnd();
let idx = 0;
const L = x.length;

function skip() {
  while (idx < L) {
    const c = x.charCodeAt(idx);
    if (c > 32) break;
    idx++;
  }
}

function nextInt(): number {
  skip();
  if (idx >= L) return -1;
  let sgn = 1;
  if (x.charCodeAt(idx) === 45) { sgn = -1; idx++; }
  let v = 0;
  while (idx < L) {
    const c = x.charCodeAt(idx);
    if (c <= 32) break;
    v = v * 10 + (c - 48);
    idx++;
  }
  return v * sgn;
}

const n = nextInt();
const k = nextInt();
const J = nextInt();
if (n < 0 || k < 0 || J < 0) process.exit(0);

// ----- parents -----
const parent = new Int32Array(n + 1);
for (let v = 2; v <= n; v++) {
  const p = nextInt();
  if (p < 1) process.exit(0);
  parent[v] = p;
}

const singer = new Int32Array(n + 1);
let maxSinger = 0;
for (let v = 1; v <= n; v++) {
  const s = nextInt();
  if (s < 1) process.exit(0);
  singer[v] = s;
  if (s > maxSinger) maxSinger = s;
}

const head = new Int32Array(n + 1);
head.fill(-1);
const to = new Int32Array(n - 1);
const nx = new Int32Array(n - 1);
let ec = 0;

for (let v = 2; v <= n; v++) {
  const p = parent[v];
  to[ec] = v;
  nx[ec] = head[p];
  head[p] = ec++;
}

const tin = new Int32Array(n + 1);
const tout = new Int32Array(n + 1);
const sz = new Int32Array(n + 1);

const stV = new Int32Array(2 * n + 5);
const stE = new Int32Array(2 * n + 5);
let sp = 0;

let timer = 0;
stV[sp] = 1;
stE[sp] = head[1];
sp++;
tin[1] = ++timer;
sz[1] = 1;

while (sp > 0) {
  const v = stV[sp - 1];
  const e = stE[sp - 1];

  if (e === -2) {
    tout[v] = timer;
    sp--;
    if (sp > 0) {
      const pv = stV[sp - 1];
      sz[pv] += sz[v];
    }
    continue;
  }

  if (e === -1) {
    stE[sp - 1] = -2;
    continue;
  }

  stE[sp - 1] = nx[e];
  const u = to[e];
  tin[u] = ++timer;
  sz[u] = 1;

  stV[sp] = u;
  stE[sp] = head[u];
  sp++;
}

const cntSinger = new Int32Array(maxSinger + 1);
for (let v = 1; v <= n; v++) cntSinger[singer[v]]++;

const start = new Int32Array(maxSinger + 2);
for (let s = 1; s <= maxSinger; s++) start[s + 1] = start[s] + cntSinger[s];

const cur = new Int32Array(maxSinger + 1);
cur.set(start.subarray(0, maxSinger + 1));

const nodesBySinger = new Int32Array(n);
for (let v = 1; v <= n; v++) {
  const s = singer[v];
  nodesBySinger[cur[s]++] = tin[v];
}

const qt = new Int32Array(k);
const qp = new Int32Array(k);
const qv = new Int32Array(k);

for (let i = 0; i < k; i++) {
  const t = nextInt();
  const pNode = nextInt();
  const S = nextInt();
  if (t < 0 || pNode < 1 || pNode > n || S < 0) process.exit(0);
  const den = sz[pNode];
  if (den <= 0) process.exit(0);
  const v = Math.floor(S / den);
  qt[i] = t;
  qp[i] = pNode;
  qv[i] = v;
}

const ord = new Int32Array(k);
for (let i = 0; i < k; i++) ord[i] = i;
ord.sort((a, b) => qt[a] - qt[b]);

function reorderInt(src: Int32Array) {
  const tmp = new Int32Array(k);
  for (let i = 0; i < k; i++) tmp[i] = src[ord[i]];
  src.set(tmp);
}
reorderInt(qt);
reorderInt(qp);
reorderInt(qv);

class BIT {
  n: number;
  bit: Float64Array;
  constructor(n: number) { this.n = n; this.bit = new Float64Array(n + 2); }
  add(i: number, v: number) {
    if (i <= 0) return;
    const b = this.bit;
    for (let x = i; x <= this.n; x += x & -x) b[x] += v;
  }
  sum(i: number): number {
    if (i <= 0) return 0;
    const b = this.bit;
    let r = 0;
    for (let x = i; x > 0; x -= x & -x) r += b[x];
    return r;
  }
  clear() { this.bit.fill(0); }
}
const bit = new BIT(n);

const singersList: number[] = [];
for (let s = 1; s <= maxSinger; s++) if (cntSinger[s] > 0) singersList.push(s);

const lo = new Int32Array(maxSinger + 1);
const hi = new Int32Array(maxSinger + 1);
for (const s of singersList) { lo[s] = 1; hi[s] = k + 1; }

const headMid = new Int32Array(k + 2);
const nextS = new Int32Array(maxSinger + 1);

let changed = true;
while (changed) {
  changed = false;
  headMid.fill(-1);

  for (const s of singersList) {
    if (lo[s] < hi[s]) {
      changed = true;
      const mid = (lo[s] + hi[s]) >> 1;
      nextS[s] = headMid[mid];
      headMid[mid] = s;
    }
  }
  if (!changed) break;

  bit.clear();
  let qptr = 0;

  for (let mid = 1; mid <= k; mid++) {
    while (qptr < mid) {
      const pNode = qp[qptr];
      const v = qv[qptr];
      qptr++;

      if (v !== 0) {
        const l = tin[pNode];
        const r = tout[pNode];
        bit.add(l, v);
        if (r + 1 <= n) bit.add(r + 1, -v);
      }
    }

    for (let s = headMid[mid]; s !== -1; s = nextS[s]) {
      const l = start[s], r = start[s + 1];
      let total = 0;
      for (let i = l; i < r; i++) total += bit.sum(nodesBySinger[i]);

      const need = J * cntSinger[s];
      if (total > need) hi[s] = mid;
      else lo[s] = mid + 1;
    }
  }
}

const ansSinger = new Int32Array(maxSinger + 1);
for (const s of singersList) {
  const at = lo[s];
  ansSinger[s] = (at <= k) ? qt[at - 1] : -1;
}

let out = "";
for (let v = 1; v <= n; v++) out += ansSinger[singer[v]] + "\n";
process.stdout.write(out);