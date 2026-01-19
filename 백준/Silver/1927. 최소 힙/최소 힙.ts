import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0;
const N = Number(input[p++]);

class MinHeap {
  private h: number[] = [];

  push(x: number) {
    const h = this.h;
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (h[parent] <= h[i]) break;
      const t = h[parent];
      h[parent] = h[i];
      h[i] = t;
      i = parent;
    }
  }

  pop(): number | null {
    const h = this.h;
    if (h.length === 0) return null;
    const top = h[0];
    const last = h.pop()!;
    if (h.length > 0) {
      h[0] = last;
      let i = 0;
      while (true) {
        const l = i * 2 + 1;
        const r = l + 1;
        if (l >= h.length) break;
        let m = l;
        if (r < h.length && h[r] < h[l]) m = r;
        if (h[i] <= h[m]) break;
        const t = h[i];
        h[i] = h[m];
        h[m] = t;
        i = m;
      }
    }
    return top;
  }
}

const heap = new MinHeap();
let out: string[] = [];

for (let i = 0; i < N; i++) {
  const x = Number(input[p++]);
  if (x !== 0) heap.push(x);
  else {
    const v = heap.pop();
    out.push(v === null ? "0" : String(v));
  }
}

process.stdout.write(out.join("\n"));