const readline = require("readline");

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  size() {
    return this.heap.length - 1;
  }

  peek() {
    return this.heap[1];
  }

  push(value) {
    const heap = this.heap;
    heap.push(value);
    let idx = heap.length - 1;

    while (idx > 1) {
      const parent = idx >> 1;
      if (heap[parent] <= heap[idx]) break;
      [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
      idx = parent;
    }
  }

  pop() {
    const heap = this.heap;
    if (heap.length === 1) return null;
    if (heap.length === 2) return heap.pop();

    const min = heap[1];
    heap[1] = heap.pop();
    let idx = 1;

    while (true) {
      const left = idx * 2;
      const right = left + 1;
      let smallest = idx;

      if (left < heap.length && heap[left] < heap[smallest]) {
        smallest = left;
      }
      if (right < heap.length && heap[right] < heap[smallest]) {
        smallest = right;
      }
      if (smallest === idx) break;

      [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
      idx = smallest;
    }

    return min;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N = -1;
const heap = new MinHeap();

rl.on("line", (line) => {
  if (N === -1) {
    N = parseInt(line.trim(), 10);
    return;
  }

  const parts = line.trim().split(" ");
  for (let i = 0; i < parts.length; i++) {
    const x = parseInt(parts[i], 10);
    heap.push(x);
    if (heap.size() > N) heap.pop();
  }
}).on("close", () => {
  console.log(String(heap.peek()));
});