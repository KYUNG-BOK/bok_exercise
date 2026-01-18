// 그만해라 , 많이 빠꾸먹었잖ㅇ아, 보내즈ㅏㅏ

import * as fs from "fs";

const s = fs.readFileSync(0, "utf8").trimEnd();
const n = s.length;

type Id = number;

const termId = new Map<string, Id>();
const termStr: string[] = [];
const termLen: number[] = [];
const isConst: boolean[] = [];

const parent: number[] = [];
const size: number[] = [];
const best: number[] = [];
const fixedConst: (string | null)[] = [];

function makeTerm(t: string, c: boolean): Id {
  const ex = termId.get(t);
  if (ex !== undefined) return ex;
  const id = termStr.length;
  termId.set(t, id);
  termStr.push(t);
  termLen.push(t.length);
  isConst.push(c);

  parent.push(id);
  size.push(1);
  best.push(id);
  fixedConst.push(c ? t : null);
  return id;
}

function find(x: number): number {
  while (parent[x] !== x) {
    parent[x] = parent[parent[x]];
    x = parent[x];
  }
  return x;
}

function better(a: number, b: number): number {
  const la = termLen[a], lb = termLen[b];
  if (la !== lb) return la < lb ? a : b;
  return termStr[a] <= termStr[b] ? a : b;
}

let unsat = false;

function union(a: number, b: number) {
  a = find(a);
  b = find(b);
  if (a === b) return;

  if (size[a] < size[b]) {
    const tmp = a; a = b; b = tmp;
  }

  parent[b] = a;
  size[a] += size[b];

  best[a] = better(best[a], best[b]);

  const ca = fixedConst[a];
  const cb = fixedConst[b];
  if (ca !== null && cb !== null) {
    if (ca !== cb) unsat = true;
  } else if (ca === null && cb !== null) {
    fixedConst[a] = cb;
  }
}

const ineqA: number[] = [];
const ineqB: number[] = [];

function isAlpha(ch: number): boolean {
  return (65 <= ch && ch <= 90) || (97 <= ch && ch <= 122);
}

function getTermIdByString(t: string): Id {
  const c0 = t.charCodeAt(0);
  const c = isAlpha(c0);
  return makeTerm(t, !c);
}

let i = 0;
while (i < n) {
  const leftStart = i;
  while (i < n) {
    const ch = s.charCodeAt(i);
    if (ch === 61 /* '=' */ || ch === 33 /* '!' */) break;
    i++;
  }
  const left = s.slice(leftStart, i);

  const opIsEq = s.charCodeAt(i) === 61;
  i += 2;

  const rightStart = i;
  while (i < n) {
    const ch = s.charCodeAt(i);
    if (ch === 38 /* '&' */) break;
    i++;
  }
  const right = s.slice(rightStart, i);

  const a = getTermIdByString(left);
  const b = getTermIdByString(right);

  if (opIsEq) union(a, b);
  else {
    ineqA.push(a);
    ineqB.push(b);
  }

  if (i < n) i += 2;
}

if (unsat) {
  process.stdout.write("0!=0");
  process.exit(0);
}

const repId: number[] = new Array(termStr.length);
for (let id = 0; id < termStr.length; id++) {
  const r = find(id);
  repId[r] = best[r];
}

const pairSet = new Map<number, [number, number]>();

function packPair(x: number, y: number, m: number): number {
  const a = x < y ? x : y;
  const b = x < y ? y : x;
  return a * m + b;
}

const m = termStr.length;

for (let k = 0; k < ineqA.length; k++) {
  let ra = find(ineqA[k]);
  let rb = find(ineqB[k]);
  if (ra === rb) {
    process.stdout.write("0!=0");
    process.exit(0);
  }


  const ca = fixedConst[ra];
  const cb = fixedConst[rb];

  if (ca !== null && cb !== null && ca !== cb) continue;

  const key = packPair(ra, rb, m);
  if (!pairSet.has(key)) {
    if (ra > rb) { const tmp = ra; ra = rb; rb = tmp; }
    pairSet.set(key, [ra, rb]);
  }
}

const clauses: string[] = [];

for (let id = 0; id < termStr.length; id++) {
  const r = find(id);
  if (size[r] <= 1) continue;

  const center = best[r];
  if (id === center) continue;

  clauses.push(termStr[id] + "==" + termStr[center]);
}

pairSet.forEach((pair) => {
  const ra = pair[0], rb = pair[1];
  const a = repId[ra];
  const b = repId[rb];
  clauses.push(termStr[a] + "!=" + termStr[b]);
});

if (clauses.length === 0) process.stdout.write("0==0");
else process.stdout.write(clauses.join("&&"));