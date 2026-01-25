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

type Node = { h: number; c: number };
const st: Node[] = [];
let ans = 0;

for (let i = 0; i < n; i++) {
  const x = readInt();
  let cnt = 1;

  while (st.length && st[st.length - 1].h < x) {
    ans += st[st.length - 1].c;
    st.pop();
  }

  if (st.length && st[st.length - 1].h === x) {
    const top = st.pop() as Node;
    ans += top.c;
    cnt = top.c + 1;
    if (st.length) ans += 1;
  } else {
    if (st.length) ans += 1;
  }

  st.push({ h: x, c: cnt });
}

process.stdout.write(String(ans));