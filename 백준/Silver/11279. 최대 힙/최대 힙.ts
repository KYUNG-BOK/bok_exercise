import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let idx = 0;
const n = Number(input[idx++]);

class MaxHeap {
  private heap: number[] = [];

  size(): number {
    return this.heap.length;
  }

  push(x: number): void {
    const h = this.heap;
    h.push(x);
    let i = h.length - 1;

    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[p] >= h[i]) break;
      [h[p], h[i]] = [h[i], h[p]];
      i = p;
    }
  }

  pop(): number {
    const h = this.heap;
    const len = h.length;
    if (len === 0) return 0;

    const top = h[0];
    const last = h.pop()!;

    if (len > 1) {
      h[0] = last;
      let i = 0;

      while (true) {
        const l = i * 2 + 1;
        const r = l + 1;
        if (l >= h.length) break;

        let c = l;
        if (r < h.length && h[r] > h[l]) c = r;

        if (h[i] >= h[c]) break;
        [h[i], h[c]] = [h[c], h[i]];
        i = c;
      }
    }

    return top;
  }
}

const heap = new MaxHeap();
const out: string[] = [];

for (let i = 0; i < n; i++) {
  const x = Number(input[idx++]);
  if (x === 0) out.push(String(heap.pop()));
  else heap.push(x);
}

process.stdout.write(out.join("\n"));