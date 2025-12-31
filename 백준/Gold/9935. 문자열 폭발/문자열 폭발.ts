import*as fs from "fs";

const [sRaw, bombRaw]=fs.readFileSync(0,"utf8").split("\n");
const s= (sRaw ?? "").trimEnd();
const bomb=(bombRaw ?? "").trimEnd()

const bLen=bomb.length;
const last=bomb[bLen-1];
const stack: string[]=[];
          
for (let i=0; i<s.length; i++){
    const ch=s[i];
    stack.push(ch);
    
    if(ch !==last) continue;
    if(stack.length<bLen) continue;
    
    let ok=true;
    for(let j=0; j<bLen; j++){
        if(stack[stack.length-bLen+j]!== bomb[j]){
            ok=false;
            break;
        }
    }
    if(ok){
        for(let j=0; j<bLen; j++) stack.pop();
    }
}

const ans=stack.join("");
console.log(ans.length?ans:"FRULA");