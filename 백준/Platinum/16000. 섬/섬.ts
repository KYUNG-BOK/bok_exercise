import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0;

const N = Number(input[p++]);
const M = Number(input[p++]);

const grid: string[] = new Array(N);
for (let i = 0; i < N; i++) {
  grid[i] = input[p++];
}


const totalCells = N * M;
const componentId = new Int32Array(totalCells);
const componentIsLand = new Uint8Array(totalCells + 1);

const queueRow = new Int32Array(totalCells);
const queueCol = new Int32Array(totalCells);

let componentCount = 0;

for (let idx = 0; idx < totalCells; idx++) {
  if (componentId[idx] !== 0) continue;

  const row = (idx / M) | 0;
  const col = idx % M;
  const isLand = grid[row].charAt(col) === "#";

  componentCount++;
  componentIsLand[componentCount] = isLand ? 1 : 0;

  let qHead = 0;
  let qTail = 0;
  queueRow[qTail] = row;
  queueCol[qTail] = col;
  qTail++;
  componentId[idx] = componentCount;

  while (qHead < qTail) {
    const r = queueRow[qHead];
    const c = queueCol[qHead];
    qHead++;

    let nr = r - 1;
    let nc = c;
    if (nr >= 0) {
      let ni = nr * M + nc;
      if (componentId[ni] === 0) {
        const landHere = grid[nr].charAt(nc) === "#";
        if (landHere === isLand) {
          componentId[ni] = componentCount;
          queueRow[qTail] = nr;
          queueCol[qTail] = nc;
          qTail++;
        }
      }
    }
    nr = r + 1;
    nc = c;
    if (nr < N) {
      let ni = nr * M + nc;
      if (componentId[ni] === 0) {
        const landHere = grid[nr].charAt(nc) === "#";
        if (landHere === isLand) {
          componentId[ni] = componentCount;
          queueRow[qTail] = nr;
          queueCol[qTail] = nc;
          qTail++;
        }
      }
    }
    nr = r;
    nc = c - 1;
    if (nc >= 0) {
      let ni = nr * M + nc;
      if (componentId[ni] === 0) {
        const landHere = grid[nr].charAt(nc) === "#";
        if (landHere === isLand) {
          componentId[ni] = componentCount;
          queueRow[qTail] = nr;
          queueCol[qTail] = nc;
          qTail++;
        }
      }
    }
    nr = r;
    nc = c + 1;
    if (nc < M) {
      let ni = nr * M + nc;
      if (componentId[ni] === 0) {
        const landHere = grid[nr].charAt(nc) === "#";
        if (landHere === isLand) {
          componentId[ni] = componentCount;
          queueRow[qTail] = nr;
          queueCol[qTail] = nc;
          qTail++;
        }
      }
    }
  }
}

let outComponent = 0;
for (let c = 0; c < M && outComponent === 0; c++) {
  if (grid[0].charAt(c) === ".") {
    outComponent = componentId[c]; // (0 * M + c)
  }
}
if (outComponent === 0) {
  for (let c = 0; c < M && outComponent === 0; c++) {
    if (grid[N - 1].charAt(c) === ".") {
      outComponent = componentId[(N - 1) * M + c];
    }
  }
}
if (outComponent === 0) {
  for (let r = 0; r < N && outComponent === 0; r++) {
    if (grid[r].charAt(0) === ".") {
      outComponent = componentId[r * M];
    }
    if (outComponent === 0 && grid[r].charAt(M - 1) === ".") {
      outComponent = componentId[r * M + (M - 1)];
    }
  }
}

let edgeCount = 0;

for (let r = 0; r < N; r++) {
  let baseIndex = r * M;
  for (let c = 0; c < M; c++) {
    const idxCell = baseIndex + c;
    const compA = componentId[idxCell];

    if (c + 1 < M) {
      const compB = componentId[idxCell + 1];
      if (compA !== compB) {
        edgeCount++;
      }
    }
    if (r + 1 < N) {
      const compB = componentId[idxCell + M];
      if (compA !== compB) {
        edgeCount++;
      }
    }
  }
}

const head = new Int32Array(componentCount + 1);
head.fill(-1);
const to = new Int32Array(edgeCount * 2);
const next = new Int32Array(edgeCount * 2);

let edgeIndex = 0;

for (let r = 0; r < N; r++) {
  let baseIndex = r * M;
  for (let c = 0; c < M; c++) {
    const idxCell = baseIndex + c;
    const compA = componentId[idxCell];

    if (c + 1 < M) {
      const compB = componentId[idxCell + 1];
      if (compA !== compB) {
        // A - B
        to[edgeIndex] = compB;
        next[edgeIndex] = head[compA];
        head[compA] = edgeIndex;
        edgeIndex++;

        to[edgeIndex] = compA;
        next[edgeIndex] = head[compB];
        head[compB] = edgeIndex;
        edgeIndex++;
      }
    }
    if (r + 1 < N) {
      const compB = componentId[idxCell + M];
      if (compA !== compB) {
        to[edgeIndex] = compB;
        next[edgeIndex] = head[compA];
        head[compA] = edgeIndex;
        edgeIndex++;

        to[edgeIndex] = compA;
        next[edgeIndex] = head[compB];
        head[compB] = edgeIndex;
        edgeIndex++;
      }
    }
  }
}

const disc = new Int32Array(componentCount + 1);
const low = new Int32Array(componentCount + 1);
const parent = new Int32Array(componentCount + 1);
const delta = new Int32Array(componentCount + 1);
const order = new Int32Array(componentCount + 1);
const currentEdge = new Int32Array(componentCount + 1);

let time = 0;

const stack = new Int32Array(componentCount + 1);
let stackTop = 0;

disc[outComponent] = 1;
low[outComponent] = 1;
time = 1;
order[1] = outComponent;
parent[outComponent] = 0;
currentEdge[outComponent] = head[outComponent];
stack[stackTop++] = outComponent;

while (stackTop > 0) {
  const u = stack[stackTop - 1];
  let e = currentEdge[u];

  if (e === -1) {
    stackTop--;
    const pu = parent[u];
    if (pu !== 0) {
      if (low[pu] > low[u]) {
        low[pu] = low[u];
      }
      if (low[u] >= disc[pu] && componentIsLand[pu] === 1) {
        delta[u]++;
      }
    }
    continue;
  }

  currentEdge[u] = next[e];
  const v = to[e];

  if (v === parent[u]) continue;

  if (disc[v] === 0) {
    parent[v] = u;
    time++;
    disc[v] = time;
    low[v] = time;
    order[time] = v;
    currentEdge[v] = head[v];
    stack[stackTop++] = v;
  } else {
    if (low[u] > disc[v]) {
      low[u] = disc[v];
    }
  }
}

const dangerousCount = new Int32Array(componentCount + 1);

for (let t = 1; t <= time; t++) {
  const u = order[t];
  const pu = parent[u];
  if (pu === 0) {
    dangerousCount[u] = delta[u];
  } else {
    dangerousCount[u] = dangerousCount[pu] + delta[u];
  }
}

let output = "";
for (let r = 0; r < N; r++) {
  let rowStr = "";
  const baseIndex = r * M;
  for (let c = 0; c < M; c++) {
    const ch = grid[r].charAt(c);
    if (ch === ".") {
      rowStr += ".";
    } else {
      const cid = componentId[baseIndex + c];
      if (disc[cid] === 0 || dangerousCount[cid] === 0) {
        rowStr += "O";
      } else {
        rowStr += "X";
      }
    }
  }
  output += rowStr + "\n";
}

console.log(output.trimEnd());