import*as fs from "fs";

const data=fs.readFileSync(0,"utf8").trim().split(/\s+/);
let p=0;

const N=Number(data[p++]);
const A=new Array<number>(N);
for (let i=0; i<N; i++) A[i]=Number(data[p++]);

const ans=new Array<number>(N).fill(-1);
const stack: number[] = [];

for(let i=0; i<N; i++){
    while(stack.length>0 && A[stack[stack.length -1]]<A[i]){
        const idx=stack.pop()!;
        ans[idx]=A[i];
    }
    stack.push(i)
}
console.log(ans.join(" "));