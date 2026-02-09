// 이젠 통과시켜주세요 ㅠㅠ................

import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
let idx = 0;
const L = input.length;

function skip() {
  while (idx < L) {
    const c = input.charCodeAt(idx);
    if (c > 32) break;
    idx++;
  }
}
function nextInt(): number {
  skip();
  let sgn = 1;
  if (idx < L && input.charCodeAt(idx) === 45) { sgn = -1; idx++; }
  let v = 0;
  while (idx < L) {
    const c = input.charCodeAt(idx);
    if (c <= 32) break;
    v = v * 10 + (c - 48);
    idx++;
  }
  return v * sgn;
}

const N = nextInt();
const Q = nextInt();

const headAdj = new Int32Array(N + 1);
headAdj.fill(-1);
const to = new Int32Array((N - 1) * 2);
const nx = new Int32Array((N - 1) * 2);
let ec = 0;

function addEdge(u: number, v: number) {
  to[ec] = v;
  nx[ec] = headAdj[u];
  headAdj[u] = ec++;
}

for (let i = 0; i < N - 1; i++) {
  const a = nextInt();
  const b = nextInt();
  addEdge(a, b);
  addEdge(b, a);
}

const parent = new Int32Array(N + 1);
const depth = new Int32Array(N + 1);
const size = new Int32Array(N + 1);
const heavy = new Int32Array(N + 1);
heavy.fill(0);

const order = new Int32Array(N);
let ordN = 0;

{
  const st = new Int32Array(N);
  let sp = 0;
  st[sp++] = 1;
  parent[1] = 0;
  depth[1] = 0;

  while (sp > 0) {
    const u = st[--sp];
    order[ordN++] = u;
    for (let e = headAdj[u]; e !== -1; e = nx[e]) {
      const v = to[e];
      if (v === parent[u]) continue;
      parent[v] = u;
      depth[v] = depth[u] + 1;
      st[sp++] = v;
    }
  }

  for (let i = ordN - 1; i >= 0; i--) {
    const u = order[i];
    let sz = 1;
    let best = 0;
    let bestSz = 0;
    for (let e = headAdj[u]; e !== -1; e = nx[e]) {
      const v = to[e];
      if (v === parent[u]) continue;
      const vsz = size[v];
      sz += vsz;
      if (vsz > bestSz) { bestSz = vsz; best = v; }
    }
    size[u] = sz;
    heavy[u] = best;
  }
}

const top = new Int32Array(N + 1);
const pos = new Int32Array(N + 1);
const inv = new Int32Array(N);
let cur = 0;

{
  const stU = new Int32Array(N);
  const stH = new Int32Array(N);
  let sp = 0;
  stU[sp] = 1;
  stH[sp] = 1;
  sp++;

  while (sp > 0) {
    const h = stH[--sp];
    let u = stU[sp];
    for (;;) {
      top[u] = h;
      pos[u] = cur;
      inv[cur] = u;
      cur++;

      for (let e = headAdj[u]; e !== -1; e = nx[e]) {
        const v = to[e];
        if (v === parent[u] || v === heavy[u]) continue;
        stU[sp] = v;
        stH[sp] = v;
        sp++;
      }
      const hu = heavy[u];
      if (hu === 0) break;
      u = hu;
    }
  }
}

const M = N;
const segSum = new Uint32Array(4 * M);
const lazyMul = new Uint32Array(4 * M);
const lazyAdd = new Uint32Array(4 * M);
for (let i = 0; i < lazyMul.length; i++) lazyMul[i] = 1;

function mul32(a: number, b: number): number {
  return (Math.imul(a | 0, b | 0) >>> 0);
}
function add32(a: number, b: number): number {
  return ((a + b) >>> 0);
}
function apply(node: number, mul: number, add: number, len: number) {
  const s = segSum[node] >>> 0;
  const ns = add32(mul32(s, mul), mul32(add, len));
  segSum[node] = ns;

  const lm = lazyMul[node] >>> 0;
  const la = lazyAdd[node] >>> 0;

  lazyMul[node] = mul32(lm, mul);
  lazyAdd[node] = add32(mul32(la, mul), add);
}

function push(node: number, nl: number, nr: number) {
  const mul = lazyMul[node] >>> 0;
  const add = lazyAdd[node] >>> 0;
  if (mul === 1 && add === 0) return;
  const mid = (nl + nr) >> 1;
  const lch = node << 1;
  const rch = lch | 1;
  apply(lch, mul, add, mid - nl + 1);
  apply(rch, mul, add, nr - mid);
  lazyMul[node] = 1;
  lazyAdd[node] = 0;
}

function pull(node: number) {
  segSum[node] = ((segSum[node << 1] + segSum[(node << 1) | 1]) >>> 0);
}

function update(node: number, nl: number, nr: number, ql: number, qr: number, mul: number, add: number) {
  if (ql <= nl && nr <= qr) {
    apply(node, mul, add, nr - nl + 1);
    return;
  }
  push(node, nl, nr);
  const mid = (nl + nr) >> 1;
  if (ql <= mid) update(node << 1, nl, mid, ql, qr, mul, add);
  if (qr > mid) update((node << 1) | 1, mid + 1, nr, ql, qr, mul, add);
  pull(node);
}

function query(node: number, nl: number, nr: number, ql: number, qr: number): number {
  if (ql <= nl && nr <= qr) return segSum[node] >>> 0;
  push(node, nl, nr);
  const mid = (nl + nr) >> 1;
  let res = 0;
  if (ql <= mid) res = add32(res, query(node << 1, nl, mid, ql, qr));
  if (qr > mid) res = add32(res, query((node << 1) | 1, mid + 1, nr, ql, qr));
  return res >>> 0;
}

function rangeUpdate(l: number, r: number, mul: number, add: number) {
  if (l > r) { const t = l; l = r; r = t; }
  update(1, 0, M - 1, l, r, mul >>> 0, add >>> 0);
}

function rangeQuery(l: number, r: number): number {
  if (l > r) { const t = l; l = r; r = t; }
  return query(1, 0, M - 1, l, r) >>> 0;
}

function pathUpdate(u0: number, v0: number, mul: number, add: number) {
  let u = u0, v = v0;
  mul >>>= 0; add >>>= 0;
  while (top[u] !== top[v]) {
    if (depth[top[u]] < depth[top[v]]) { const t = u; u = v; v = t; }
    rangeUpdate(pos[top[u]], pos[u], mul, add);
    u = parent[top[u]];
  }
  if (depth[u] > depth[v]) { const t = u; u = v; v = t; }
  rangeUpdate(pos[u], pos[v], mul, add);
}

function pathQuery(u0: number, v0: number): number {
  let u = u0, v = v0;
  let res = 0;
  while (top[u] !== top[v]) {
    if (depth[top[u]] < depth[top[v]]) { const t = u; u = v; v = t; }
    res = add32(res, rangeQuery(pos[top[u]], pos[u]));
    u = parent[top[u]];
  }
  if (depth[u] > depth[v]) { const t = u; u = v; v = t; }
  res = add32(res, rangeQuery(pos[u], pos[v]));
  return res >>> 0;
}

function subtreeUpdate(x: number, mul: number, add: number) {
  rangeUpdate(pos[x], pos[x] + size[x] - 1, mul, add);
}
function subtreeQuery(x: number): number {
  return rangeQuery(pos[x], pos[x] + size[x] - 1) >>> 0;
}

const out: string[] = [];
for (let i = 0; i < Q; i++) {
  const t = nextInt();
  if (t === 1) {
    const X = nextInt();
    const V = nextInt() >>> 0;
    subtreeUpdate(X, 1, V);
  } else if (t === 2) {
    const X = nextInt();
    const Y = nextInt();
    const V = nextInt() >>> 0;
    pathUpdate(X, Y, 1, V);
  } else if (t === 3) {
    const X = nextInt();
    const V = nextInt() >>> 0;
    subtreeUpdate(X, V, 0);
  } else if (t === 4) {
    const X = nextInt();
    const Y = nextInt();
    const V = nextInt() >>> 0;
    pathUpdate(X, Y, V, 0);
  } else if (t === 5) {
    const X = nextInt();
    out.push(String(subtreeQuery(X)));
  } else {
    const X = nextInt();
    const Y = nextInt();
    out.push(String(pathQuery(X, Y)));
  }
}

process.stdout.write(out.join("\n"));