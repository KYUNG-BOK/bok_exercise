import * as fs from "fs";

const [N, K] = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

const MAX = 100000;
const INF = 1e9;

const dist = new Int32Array(MAX + 1);
for (let i = 0; i <= MAX; i++) dist[i] = INF;

const dq = new Int32Array((MAX + 1) * 2 + 5);
let head = (dq.length >> 1);
let tail = head;

function pushFront(x: number) {
  dq[--head] = x;
}
function pushBack(x: number) {
  dq[tail++] = x;
}
function popFront(): number {
  return dq[head++];
}

dist[N] = 0;
pushFront(N);

while (head < tail) {
  const x = popFront();
  const d = dist[x];
  if (x === K) break;

  const nx0 = x << 1;
  if (nx0 <= MAX && dist[nx0] > d) {
    dist[nx0] = d;
    pushFront(nx0);
  }

  const nx1 = x - 1;
  if (nx1 >= 0 && dist[nx1] > d + 1) {
    dist[nx1] = d + 1;
    pushBack(nx1);
  }

  const nx2 = x + 1;
  if (nx2 <= MAX && dist[nx2] > d + 1) {
    dist[nx2] = d + 1;
    pushBack(nx2);
  }
}

console.log(dist[K].toString());