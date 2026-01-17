import * as fs from "fs";

const x = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let p = 0;

const n = x[p++], m = x[p++];

const head = new Int32Array(n + 1);
head.fill(-1);
const to = new Int32Array(2 * m);
const nx = new Int32Array(2 * m);
let ec = 0;

function add(a: number, b: number) {
  to[ec] = b;
  nx[ec] = head[a];
  head[a] = ec++;
}

for (let i = 0; i < m; i++) {
  const a = x[p++], b = x[p++];
  add(a, b);
  add(b, a);
}

class Heap {
  aL: number[] = [];
  aV: number[] = [];
  size = 0;

  push(L: number, V: number) {
    let i = this.size++;
    this.aL[i] = L;
    this.aV[i] = V;
    while (i > 0) {
      const par = (i - 1) >> 1;
      if (this.aL[par] > L || (this.aL[par] === L && this.aV[par] >= V)) break;
      this.aL[i] = this.aL[par];
      this.aV[i] = this.aV[par];
      i = par;
    }
    this.aL[i] = L;
    this.aV[i] = V;
  }

  pop(): [number, number] | null {
    if (this.size === 0) return null;
    const rL = this.aL[0], rV = this.aV[0];

    const L = this.aL[--this.size];
    const V = this.aV[this.size];

    if (this.size > 0) {
      let i = 0;
      while (true) {
        let l = i * 2 + 1;
        if (l >= this.size) break;
        let r = l + 1;
        let c = l;

        if (r < this.size) {
          const Ll = this.aL[l], Vl = this.aV[l];
          const Lr = this.aL[r], Vr = this.aV[r];
          if (Lr > Ll || (Lr === Ll && Vr > Vl)) c = r;
        }

        const cL = this.aL[c], cV = this.aV[c];
        if (cL < L || (cL === L && cV <= V)) break;

        this.aL[i] = cL;
        this.aV[i] = cV;
        i = c;
      }
      this.aL[i] = L;
      this.aV[i] = V;
    }

    return [rL, rV];
  }
}

const label = new Int32Array(n + 1);
const used = new Uint8Array(n + 1);
const order = new Int32Array(n + 1);
const pos = new Int32Array(n + 1);

const h = new Heap();
for (let v = 1; v <= n; v++) h.push(0, v);

for (let i = n; i >= 1; i--) {
  while (true) {
    const t = h.pop();
    if (!t) break;
    const [L, v] = t;
    if (used[v]) continue;
    if (L !== label[v]) continue;
    used[v] = 1;
    order[i] = v;
    pos[v] = i;

    for (let e = head[v]; e !== -1; e = nx[e]) {
      const u = to[e];
      if (!used[u]) {
        const nl = ++label[u];
        h.push(nl, u);
      }
    }
    break;
  }
}

const parent = new Int32Array(n + 1);
const reqHead = new Int32Array(n + 1);
reqHead.fill(-1);
const reqTo = new Int32Array(m);
const reqNx = new Int32Array(m);
let rc = 0;

function addReq(par: number, u: number) {
  reqTo[rc] = u;
  reqNx[rc] = reqHead[par];
  reqHead[par] = rc++;
}

for (let i = 1; i <= n; i++) {
  const v = order[i];
  let par = 0;
  let bestPos = 0x7fffffff;

  for (let e = head[v]; e !== -1; e = nx[e]) {
    const u = to[e];
    const pu = pos[u];
    if (pu > i && pu < bestPos) {
      bestPos = pu;
      par = u;
    }
  }
  parent[v] = par;

  if (par !== 0) {
    for (let e = head[v]; e !== -1; e = nx[e]) {
      const u = to[e];
      if (u === par) continue;
      if (pos[u] > i) addReq(par, u);
    }
  }
}

const mark = new Int32Array(n + 1);
let ts = 1;

for (let par = 1; par <= n; par++) {
  if (reqHead[par] === -1) continue;

  ts++;
  for (let e = head[par]; e !== -1; e = nx[e]) {
    mark[to[e]] = ts;
  }

  for (let it = reqHead[par]; it !== -1; it = reqNx[it]) {
    const u = reqTo[it];
    if (mark[u] !== ts) {
      process.stdout.write("0\n");
      process.exit(0);
    }
  }
}

let out = "1\n";
for (let i = 1; i <= n; i++) {
  out += String(order[i]) + (i === n ? "\n" : " ");
}
process.stdout.write(out);