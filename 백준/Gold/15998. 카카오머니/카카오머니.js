const fs = require("fs");

function readTokens(){
    const data = fs.readFileSync(0,"utf8").trim();
    if(data.length===0) return [];
    return data.split(/\s+/);
}
function print(x){
    process.stdout.write(String(x));
}
function gcd(a, b){
    while(b!==0n){
        const t=a%b;
        a=b;
        b=t;
    }
    return a<0n ? -a:a;
}
const input = readTokens();
let ptr = 0;
if(input.length===0){
    print("1");
    process.exit(0);
}
const N = Number(input[ptr++]);

let balance=0n;
let m=0n;
let maxSeenBalance=0n;
let isValid=true;

for(let i=0; i<N; i++){
    if (ptr+1 >= input.length){
        isValid=false;
        break;
    }
    const a = BigInt(input[ptr++]);
    const b = BigInt(input[ptr++]);
    
    if(a>0n){
        if(balance+a!==b){
            isValid = false;
            break;
        }
        balance=b;
    } else {
        const x=-a;
        
        if(balance>=x){
            if(balance-x!==b){
                isValid=false;
                break;
            }
            balance=b;
        } else {
            const diff=b+x-balance;
            if(diff<=0n){
                isValid=false;
                break;
            }
            m=gcd(m, diff);
            if(b>maxSeenBalance) maxSeenBalance=b;
            balance=b;
        }
    }
}
if(!isValid){
    console.log("-1");
} else if (m===0n){
    console.log("1");
} else if (m<=maxSeenBalance){
    console.log("-1");
} else {
    console.log(m.toString());
}