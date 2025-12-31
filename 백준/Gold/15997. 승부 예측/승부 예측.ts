import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim().split("\n");

const teams = input[0].split(" ");
const idx: Record<string, number> = {};
teams.forEach((t, i) => (idx[t] = i));

type Match = {
    a: number;
    b: number;
    w: number;
    d: number;
    l: number;
}

const matches: Match[] = [];

for(let i =1; i<=6; i++){
    const [A,B,W,D,L] = input[i].split(" ");
    matches.push({
        a: idx[A],
        b: idx[B],
        w: Number(W),
        d: Number(D),
        l: Number(L),
    });
}

const result = Array(4).fill(0);

function dfs(
    game: number,
    scores: number[],
    prob: number
   ){
        if(game === 6) {
            const arr = scores
                .map((s,i) => ({s, i}))
                .sort((x,y) => y.s - x.s);
            
            let pos = 0;
            while (pos < 4) {
                let same=[arr[pos]];
                let next = pos + 1;
                
                while (next < 4 && arr[next].s === arr[pos].s) {
                    same.push(arr[next]);
                    next++
                }
                
                const start = pos;
                const end = next -1;
                
                for (const team of same) {
                    let count = 0;
                    for( let r = start; r <= end; r++){
                        if(r<2) count++;
                    }
                    if(count > 0){
                        result[team.i] +=
                            prob*(count / same.length);
                    }
                }
                
                pos=next;
            }
            return;
        }
        const m = matches[game];
        
        dfs(
            game+1,
            scores.map((v,i) => 
                      i === m.a ? v+3:v
        ),
                       prob * m.w
            );
        dfs(
            game+1,
            scores.map((v, i) =>
                      i === m.a || i === m.b ? v+1 :v
                      ),
            prob * m.d
        );
        dfs(
            game+1,
            scores.map((v, i) => 
                      i === m.b ? v+3 : v
                      ),
            prob*m.l
        );
    }
    dfs(0, [0,0,0,0], 1);

result.forEach((v) =>
              console.log(v.toFixed(10))
              );