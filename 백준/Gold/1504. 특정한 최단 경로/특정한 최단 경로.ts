import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0;
const N = Number(input[p++]);
const E = Number(input[p++]);

type Edge = { to: number; w: number };
const graph: Edge[][] = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < E; i++) {
  const a = Number(input[p++]);
  const b = Number(input[p++]);
  const c = Number(input[p++]);
  graph[a].push({ to: b, w: c });
  graph[b].push({ to: a, w: c });
}

const v1 = Number(input[p++]);
const v2 = Number(input[p++]);

class MinHeap {
  private heap: [number, number][] = [];

  size() {
    return this.heap.length;
  }

  push(x: [number, number]) {
    const h = this.heap;
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[p][0] <= h[i][0]) break;
      [h[p], h[i]] = [h[i], h[p]];
      i = p;
    }
  }

  pop(): [number, number] | undefined {
    const h = this.heap;
    if (h.length === 0) return undefined;
    const top = h[0];
    const last = h.pop()!;
    if (h.length > 0) {
      h[0] = last;
      let i = 0;
      while (true) {
        let l = i * 2 + 1;
        let r = l + 1;
        let s = i;
        if (l < h.length && h[l][0] < h[s][0]) s = l;
        if (r < h.length && h[r][0] < h[s][0]) s = r;
        if (s === i) break;
        [h[i], h[s]] = [h[s], h[i]];
        i = s;
      }
    }
    return top;
  }
}

const INF = Number.MAX_SAFE_INTEGER;

function dijkstra(start: number): number[] {
  const dist = new Array<number>(N + 1).fill(INF);
  dist[start] = 0;
  const pq = new MinHeap();
  pq.push([0, start]);

  while (pq.size()) {
    const [d, u] = pq.pop()!;
    if (d !== dist[u]) continue;
    for (const e of graph[u]) {
      const nd = d + e.w;
      if (nd < dist[e.to]) {
        dist[e.to] = nd;
        pq.push([nd, e.to]);
      }
    }
  }
  return dist;
}

const d1 = dijkstra(1);
const dv1 = dijkstra(v1);
const dv2 = dijkstra(v2);

function sum(a: number, b: number, c: number) {
  if (a === INF || b === INF || c === INF) return INF;
  return a + b + c;
}

const a = sum(d1[v1], dv1[v2], dv2[N]);
const b = sum(d1[v2], dv2[v1], dv1[N]);

const ans = Math.min(a, b);
console.log(ans === INF ? -1 : ans);