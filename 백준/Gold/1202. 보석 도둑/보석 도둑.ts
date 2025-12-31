import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0;

const N = Number(input[p++]);
const K = Number(input[p++]);

type Jewel = { w: number; v: number };
const jewels: Jewel[] = new Array(N);

for (let i = 0; i < N; i++) {
  const w = Number(input[p++]);
  const v = Number(input[p++]);
  jewels[i] = { w, v };
}

const bags: number[] = new Array(K);
for (let i = 0; i < K; i++) bags[i] = Number(input[p++]);

jewels.sort((a, b) => a.w - b.w);
bags.sort((a, b) => a - b);

class MaxHeap {
  private a: number[] = [];
  size() { return this.a.length; }
  push(x: number) {
    const a = this.a;
    a.push(x);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p] >= a[i]) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  pop(): number | undefined {
    const a = this.a;
    const n = a.length;
    if (n === 0) return undefined;
    const top = a[0];
    const last = a.pop()!;
    if (n > 1) {
      a[0] = last;
      let i = 0;
      while (true) {
        let l = i * 2 + 1;
        let r = l + 1;
        if (l >= a.length) break;
        let m = l;
        if (r < a.length && a[r] > a[l]) m = r;
        if (a[i] >= a[m]) break;
        [a[i], a[m]] = [a[m], a[i]];
        i = m;
      }
    }
    return top;
  }
}

const heap = new MaxHeap();
let j = 0;
let total = BigInt(0);

for (let i = 0; i < K; i++) {
  const cap = bags[i];

  while (j < N && jewels[j].w <= cap) {
    heap.push(jewels[j].v);
    j++;
  }

  const best = heap.pop();
  if (best !== undefined) total += BigInt(best);
}

console.log(total.toString());
