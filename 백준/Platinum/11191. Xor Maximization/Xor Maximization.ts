import * as fs from "fs";

const tokens=fs.readFileSync(0,"utf8").trim().split(/\s+/);
let ptr=0;

const n=Number(tokens[ptr++]);

const ZERO=BigInt(0);
const ONE=BigInt(1);

const MAX_BIT=60;
const basis: bigint[]=Array(MAX_BIT+1).fill(ZERO);

for(let i=0; i<n; i++){
    let x=BigInt(tokens[ptr++]);
    
    for(let bit=MAX_BIT; bit>=0; bit--){
        const bitMask=ONE<<BigInt(bit);
        if((x&bitMask)===ZERO) continue;
        
        if(basis[bit] !==ZERO){
            x=x^basis[bit];
        } else {
            basis[bit]=x;
            break;
        }
        }
    }
let answer =ZERO;
for(let bit=MAX_BIT; bit>=0; bit--){
    const candidate=answer^basis[bit];
    if(candidate>answer) answer=candidate;
}

console.log(answer.toString());