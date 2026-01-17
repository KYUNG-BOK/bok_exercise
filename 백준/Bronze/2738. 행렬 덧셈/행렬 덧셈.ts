import * as fs from "fs";

const x = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

let p = 0;
const n = x[p++];
const m = x[p++];

const a: number[][] = [];
const b: number[][] = [];

for (let i = 0; i < n; i++) {
  a.push(x.slice(p, p + m));
  p += m;
}

for (let i = 0; i < n; i++) {
  b.push(x.slice(p, p + m));
  p += m;
}

let o = "";
for (let i = 0; i < n; i++) {
  let r = [];
  for (let j = 0; j < m; j++) {
    r.push(a[i][j] + b[i][j]);
  }
  o += r.join(" ") + "\n";
}

process.stdout.write(o);