import * as fs from "fs";

const lines = fs.readFileSync(0, "utf8").split("\n");
const out: string[] = [];

for (let i = 0; i < lines.length; i++) {
  const s = lines[i].replace(/\r/g, "");
  if (s === ".") break;

  const st: number[] = [];
  let ok = true;

  for (let j = 0; j < s.length; j++) {
    const c = s.charCodeAt(j);

    if (c === 40 || c === 91) {
      st.push(c);
    } else if (c === 41) {
      if (!st.length || st[st.length - 1] !== 40) { ok = false; break; }
      st.pop();
    } else if (c === 93) {
      if (!st.length || st[st.length - 1] !== 91) { ok = false; break; }
      st.pop();
    }
  }

  if (st.length) ok = false;
  out.push(ok ? "yes" : "no");
}

process.stdout.write(out.join("\n"));