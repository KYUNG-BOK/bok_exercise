import * as fs from "fs";

const input=fs.readFileSync(0,"utf8").trim().split(/\s+/).map(Number);

let maxVal=-1;
let maxRow=-1;
let maxCol=-1;

let idx=0;

for(let r=1;r<=9;r++){
    for(let c=1; c<=9; c++){
        const value=input[idx++];
        if(value>maxVal){
            maxVal=value;
            maxRow=r;
            maxCol=c;
        }
    }
}

console.log(maxVal);
console.log(`${maxRow} ${maxCol}`);