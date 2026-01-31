import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);

const size = N * 2 + 5;
const dq = new Int32Array(size);

let head = Math.floor(size / 2);
let tail = head;
let cnt = 0;

let res: string[] = [];
let idx = 1;

for (let i = 0; i < N; i++, idx++) {
  const cmd = input[idx].split(" ");

  switch (cmd[0]) {
    case "1":
      dq[--head] = Number(cmd[1]);
      cnt++;
      break;
    case "2":
      dq[tail++] = Number(cmd[1]);
      cnt++;
      break;
    case "3":
      if (cnt === 0) res.push("-1");
      else {
        res.push(String(dq[head++]));
        cnt--;
      }
      break;
    case "4":
      if (cnt === 0) res.push("-1");
      else {
        res.push(String(dq[--tail]));
        cnt--;
      }
      break;
    case "5":
      res.push(String(cnt));
      break;
    case "6":
      res.push(cnt === 0 ? "1" : "0");
      break;
    case "7":
      res.push(cnt === 0 ? "-1" : String(dq[head]));
      break;
    case "8":
      res.push(cnt === 0 ? "-1" : String(dq[tail - 1]));
      break;
  }
}

console.log(res.join("\n"));