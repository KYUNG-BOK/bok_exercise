import * as fs from "fs";

const buf = fs.readFileSync(0);
let p = 0;

function readInt(): number {
  while (p < buf.length && buf[p] <= 32) p++;
  let num = 0;
  while (p < buf.length) {
    const c = buf[p];
    if (c <= 32) break;
    num = num * 10 + (c - 48);
    p++;
  }
  return num;
}

const n = readInt();
const h = new Array<number>(n + 1);
for (let i = 0; i < n; i++) h[i] = readInt();
h[n] = 0;

const st: number[] = [];
let ans = 0;

for (let i = 0; i <= n; i++) {
  const cur = h[i];
  while (st.length && h[st[st.length - 1]] > cur) {
    const top = st.pop() as number;
    const height = h[top];
    const left = st.length ? st[st.length - 1] : -1;
    const width = i - left - 1;
    const area = height * width;
    if (area > ans) ans = area;
  }
  st.push(i);
}

process.stdout.write(String(ans));
