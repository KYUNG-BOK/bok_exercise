import * as fs from "fs";

const lines = fs.readFileSync(0, "utf8").trim().split("\n");
const T = Number(lines[0]);
const out: string[] = [];

for (let i = 1; i <= T; i++) {
  const s = (lines[i] ?? "").trim();
  let bal = 0;
  let ok = true;

  for (let j = 0; j < s.length; j++) {
    if (s.charCodeAt(j) === 40) bal++;
    else bal--;
    if (bal < 0) { ok = false; break; }
  }

  if (bal !== 0) ok = false;
  out.push(ok ? "YES" : "NO");
}

process.stdout.write(out.join("\n"));