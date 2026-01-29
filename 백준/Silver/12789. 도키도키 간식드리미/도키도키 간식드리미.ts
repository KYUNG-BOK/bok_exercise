import * as fs from "fs";

const buf = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let idx = 0;

const n = Number(buf[idx++]);
const st: number[] = [];
let need = 1;

for (let i = 0; i < n; i++) {
  const x = Number(buf[idx++]);

  while (st.length && st[st.length - 1] === need) {
    st.pop();
    need++;
  }

  if (x === need) {
    need++;
  } else {
    st.push(x);
  }
}

while (st.length && st[st.length - 1] === need) {
  st.pop();
  need++;
}

process.stdout.write(need === n + 1 ? "Nice" : "Sad");