import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0;

const N = Number(input[p++]);
const stack: number[] = [];
let out = "";

for (let i = 0; i < N; i++) {
  const cmd = Number(input[p++]);

  if (cmd === 1) {
    stack.push(Number(input[p++]));
  } else if (cmd === 2) {
    out += (stack.length ? stack.pop()! : -1) + "\n";
  } else if (cmd === 3) {
    out += stack.length + "\n";
  } else if (cmd === 4) {
    out += (stack.length === 0 ? 1 : 0) + "\n";
  } else if (cmd === 5) {
    out += (stack.length ? stack[stack.length - 1] : -1) + "\n";
  }
}

process.stdout.write(out);