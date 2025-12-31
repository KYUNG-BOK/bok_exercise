const fs = require("fs");
const data = fs.readFileSync(0,"utf8").trim();
if(data.length===0) {
    console.log("1");
    return;
}

const input = data.split(/\s+/);
let ptr = 0;
const N = Number(input[ptr++]);

function gcd(a, b){
    while(b!==0n){
        const t=a%b;
        a=b
        b=t
    }
    return a<0n ? -a:a;
}

let cur=0n;
let g=0n;
let maxB=0n;
let valid=true;

for(let i=0; i<N; i++){
    if (ptr+1 >= input.length){
        valid=false;
        break;
    }
    const a = BigInt(input[ptr++]);
    const b = BigInt(input[ptr++]);
    
    if(a>0n){
        if(cur+a!==b){
            valid = false;
            break;
        }
        cur=b;
    } else {
        const x=-a;
        
        if(cur>=x){
            if(cur-x!==b){
                valid=false;
                break;
            }
            cur=b;
        } else {
            const diff=b+x-cur;
            if(diff<=0n){
                valid=false;
                break;
            }
            g=gcd(g, diff);
            if(b>maxB) maxB=b;
            cur=b;
        }
    }
}
if(!valid){
    console.log("-1");
} else if (g===0n){
    console.log("1");
} else if (g<=maxB){
    console.log("-1");
} else {
    console.log(g.toString());
}