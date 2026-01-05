import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let index = 0;

const N = Number(input[index++]);

const matrix: number[][] = Array.from({ length: N }, () => Array(N + 1).fill(0));

for (let r = 0; r < N; r++) {
  for (let c = 0; c < N + 1; c++) {
    matrix[r][c] = Number(input[index++]);
  }
}

for (let pivotCol = 0; pivotCol < N; pivotCol++) {
  let pivotRow = pivotCol;
  while (pivotRow < N && matrix[pivotRow][pivotCol] === 0) pivotRow++;

  if (pivotRow !== pivotCol) {
    const temp = matrix[pivotRow];
    matrix[pivotRow] = matrix[pivotCol];
    matrix[pivotCol] = temp;
  }

  const pivotValue = matrix[pivotCol][pivotCol];

  for (let row = pivotCol + 1; row < N; row++) {
    const belowValue = matrix[row][pivotCol];
    if (belowValue === 0) continue;

    const factor = belowValue / pivotValue;
    for (let col = pivotCol; col < N + 1; col++) {
      matrix[row][col] -= factor * matrix[pivotCol][col];
    }
  }
}

const solution: number[] = Array(N).fill(0);

for (let row = N - 1; row >= 0; row--) {
  let rhs = matrix[row][N];
  for (let col = row + 1; col < N; col++) {
    rhs -= matrix[row][col] * solution[col];
  }
  solution[row] = rhs / matrix[row][row];
}

const answer = solution.map((x) => String(Math.round(x)));
console.log(answer.join(" "));