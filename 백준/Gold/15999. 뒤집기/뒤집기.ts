import * as fs from "fs";

const x = fs.readFileSync(0, "utf8").trim().split("\n");
let p = 0;

const [n, m] = x[p++].trim().split(" ").map(Number);

const g: string[] = [];
for (let i = 0; i < n; i++) g.push(x[p++].trim());

const MOD = 1000000007;

let cnt = 0;

for (let i = 0; i < n; i++) {
  const row = g[i];
  for (let j = 0; j < m; j++) {
    const c = row[j];
    let ok = true;

    if (i > 0 && g[i - 1][j] !== c) ok = false;
    else if (i + 1 < n && g[i + 1][j] !== c) ok = false;
    else if (j > 0 && row[j - 1] !== c) ok = false;
    else if (j + 1 < m && row[j + 1] !== c) ok = false;

    if (ok) cnt++;
  }
}

let ans = 1;
for (let i = 0; i < cnt; i++) {
  ans <<= 1;
  if (ans >= MOD) ans -= MOD;
}

process.stdout.write(String(ans) + "\n");