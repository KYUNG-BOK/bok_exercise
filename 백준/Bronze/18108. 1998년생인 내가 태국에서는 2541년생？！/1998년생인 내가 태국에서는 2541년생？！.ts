import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim();
const y = Number(input);

console.log(y - 543);