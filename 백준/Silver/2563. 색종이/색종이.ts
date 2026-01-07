import * as fs from "fs";

const data = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let p = 0;

const n = data[p++];

const paper: boolean[][] = Array.from({ length: 100 }, () =>
  Array(100).fill(false)
);

for (let k = 0; k < n; k++) {
  const x = data[p++];
  const y = data[p++];

  for (let i = x; i < x + 10; i++) {
    for (let j = y; j < y + 10; j++) {
      paper[i][j] = true;
    }
  }
}

let area = 0;
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    if (paper[i][j]) area++;
  }
}

console.log(area);