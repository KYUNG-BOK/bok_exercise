import * as fs from "fs";

const buf = fs.readFileSync(0, "utf8").split("\n");
const n = Number(buf[0]);

const q: number[] = new Array(n);
let head = 0, tail = 0;

const out: string[] = [];
let line = 1;

for (let i = 0; i < n; i++, line++) {
  const cmd = buf[line];

  if (cmd[0] === "p") {
    if (cmd[1] === "u") {
      q[tail++] = Number(cmd.slice(5));
    } else {
      if (head === tail) out.push("-1");
      else out.push(String(q[head++]));
    }
  } else if (cmd[0] === "s") {
    out.push(String(tail - head));
  } else if (cmd[0] === "e") {
    out.push(head === tail ? "1" : "0");
  } else if (cmd[0] === "f") {
    out.push(head === tail ? "-1" : String(q[head]));
  } else {
    out.push(head === tail ? "-1" : String(q[tail - 1]));
  }
}

process.stdout.write(out.join("\n"));