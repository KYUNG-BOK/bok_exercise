import * as fs from "fs";

const rawText: string = fs.readFileSync(0, "utf8").trim();
if (rawText.length === 0) {
  process.exit(0);
}

const tokens: string[] = rawText.split(/\s+/);
let tokenIndex: number = 0;

function readNumber(): number {
  const value: number = Number(tokens[tokenIndex]);
  tokenIndex += 1;
  return value;
}

const vertexCount: number = readNumber();
const edgeCount: number = readNumber();

const INF: number = 1_000_000_000;

const distance: number[][] = Array.from({ length: vertexCount + 1 }, () =>
  Array.from({ length: vertexCount + 1 }, () => INF)
);

for (let edgeIndex = 0; edgeIndex < edgeCount; edgeIndex += 1) {
  const fromVertex: number = readNumber();
  const toVertex: number = readNumber();
  const cost: number = readNumber();
  distance[fromVertex][toVertex] = cost;
}

for (let intermediate = 1; intermediate <= vertexCount; intermediate += 1) {
  for (let start = 1; start <= vertexCount; start += 1) {
    const startToIntermediate: number = distance[start][intermediate];
    if (startToIntermediate === INF) continue;

    for (let end = 1; end <= vertexCount; end += 1) {
      const intermediateToEnd: number = distance[intermediate][end];
      if (intermediateToEnd === INF) continue;

      const candidate: number = startToIntermediate + intermediateToEnd;
      if (candidate < distance[start][end]) {
        distance[start][end] = candidate;
      }
    }
  }
}

let minimumCycleLength: number = INF;
for (let vertex = 1; vertex <= vertexCount; vertex += 1) {
  if (distance[vertex][vertex] < minimumCycleLength) {
    minimumCycleLength = distance[vertex][vertex];
  }
}

const output: string = minimumCycleLength === INF ? "-1" : String(minimumCycleLength);
console.log(output);
