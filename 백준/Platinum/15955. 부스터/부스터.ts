import * as fs from "fs";

const data = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0;

const N = Number(data[p++]);
const Q = Number(data[p++]);

type Point = { x: number; y: number; id: number };
const pts: Point[] = new Array(N);

for (let i = 0; i < N; i++) {
  const x = Number(data[p++]);
  const y = Number(data[p++]);
  pts[i] = { x, y, id: i };
}

type Edge = { w: number; u: number; v: number };
const edges: Edge[] = [];

{
  const arr = [...pts].sort((a, b) => a.x - b.x || a.y - b.y);
  for (let i = 0; i + 1 < N; i++) {
    const a = arr[i], b = arr[i + 1];
    edges.push({ w: Math.abs(a.x - b.x), u: a.id, v: b.id });
  }
}

{
  const arr = [...pts].sort((a, b) => a.y - b.y || a.x - b.x);
  for (let i = 0; i + 1 < N; i++) {
    const a = arr[i], b = arr[i + 1];
    edges.push({ w: Math.abs(a.y - b.y), u: a.id, v: b.id });
  }
}

edges.sort((a, b) => a.w - b.w);

type Query = { a: number; b: number; x: number; idx: number };
const queries: Query[] = new Array(Q);
for (let i = 0; i < Q; i++) {
  const a = Number(data[p++]) - 1;
  const b = Number(data[p++]) - 1;
  const x = Number(data[p++]);
  queries[i] = { a, b, x, idx: i };
}
queries.sort((q1, q2) => q1.x - q2.x);

class DSU {
  parent: Int32Array;
  size: Int32Array;
  constructor(n: number) {
    this.parent = new Int32Array(n);
    this.size = new Int32Array(n);
    for (let i = 0; i < n; i++) { this.parent[i] = i; this.size[i] = 1; }
  }
  find(x: number): number {
    let r = x;
    while (this.parent[r] !== r) r = this.parent[r];
    while (this.parent[x] !== x) {
      const nx = this.parent[x];
      this.parent[x] = r;
      x = nx;
    }
    return r;
  }
  union(a: number, b: number): void {
    a = this.find(a); b = this.find(b);
    if (a === b) return;
    if (this.size[a] < this.size[b]) { const t = a; a = b; b = t; }
    this.parent[b] = a;
    this.size[a] += this.size[b];
  }
}

const dsu = new DSU(N);
const ans: string[] = new Array(Q);

let ei = 0;
for (const q of queries) {
  while (ei < edges.length && edges[ei].w <= q.x) {
    const e = edges[ei++];
    dsu.union(e.u, e.v);
  }
  ans[q.idx] = (dsu.find(q.a) === dsu.find(q.b)) ? "YES" : "NO";
}

process.stdout.write(ans.join("\n"));