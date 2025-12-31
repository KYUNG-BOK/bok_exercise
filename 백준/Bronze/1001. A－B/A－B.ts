import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim().split(" ");

const A = Number(input[0]);
const B = Number(input[1]);

console.log(A-B);