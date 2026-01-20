import * as fs from "fs";

const data = fs.readFileSync(0, "utf8").trimEnd().split(/\s+/);
let p = 0;

const T = Number(data[p++]);

type Edge = [to: number, w: number];

class MinHeap {
  private a: [number, number][] = [];
  size() { return this.a.length; }
  push(x: [number, number]) {
    const a = this.a;
    a.push(x);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p][0] <= a[i][0]) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  pop(): [number, number] | undefined {
    const a = this.a;
    if (!a.length) return undefined;
    const top = a[0];
    const last = a.pop()!;
    if (a.length) {
      a[0] = last;
      let i = 0;
      while (true) {
        const l = i * 2 + 1;
        const r = l + 1;
        if (l >= a.length) break;
        let c = l;
        if (r < a.length && a[r][0] < a[l][0]) c = r;
        if (a[i][0] <= a[c][0]) break;
        [a[i], a[c]] = [a[c], a[i]];
        i = c;
      }
    }
    return top;
  }
}

function dijkstra(n: number, graph: Edge[][], s: number): number[] {
  const INF = 1e15;
  const dist = Array(n + 1).fill(INF);
  dist[s] = 0;
  const pq = new MinHeap();
  pq.push([0, s]);

  while (pq.size()) {
    const [d, u] = pq.pop()!;
    if (d !== dist[u]) continue;
    for (const [v, w] of graph[u]) {
      const nd = d + w;
      if (nd < dist[v]) {
        dist[v] = nd;
        pq.push([nd, v]);
      }
    }
  }
  return dist;
}

let out: string[] = [];

for (let tc = 0; tc < T; tc++) {
  const n = Number(data[p++]);
  const m = Number(data[p++]);
  const t = Number(data[p++]);

  const s = Number(data[p++]);
  const g = Number(data[p++]);
  const h = Number(data[p++]);

  const graph: Edge[][] = Array.from({ length: n + 1 }, () => []);

  for (let i = 0; i < m; i++) {
    const a = Number(data[p++]);
    const b = Number(data[p++]);
    const d = Number(data[p++]);

    let w = d * 2;
    if ((a === g && b === h) || (a === h && b === g)) w = d * 2 - 1;

    graph[a].push([b, w]);
    graph[b].push([a, w]);
  }

  const cand: number[] = [];
  for (let i = 0; i < t; i++) cand.push(Number(data[p++]));
  cand.sort((x, y) => x - y);

  const dist = dijkstra(n, graph, s);

  const ans: number[] = [];
  for (const x of cand) {
    if (dist[x] % 2 === 1) ans.push(x);
  }
  out.push(ans.join(" "));
}

process.stdout.write(out.join("\n"));