import * as fs from "fs";

const rawText:string=fs.readFileSync(0,"utf8").trim();
if(rawText.length===0){
    process.exit(0);
}

const tokens:string[]=rawText.split(/\s+/);
let tokenIndex: number=0;

function readNumber(): number{
    const value: number=Number(tokens[tokenIndex]);
    tokenIndex +=1;
    return value;
}

type Edge={
    toVertex: number;
    weight:number;
}

const vertexCount:number=readNumber();
const edgeCount:number=readNumber();
const startVertex:number=readNumber();

const graph: Edge[][]=Array.from({length:vertexCount+1},()=>[]);

for(let edgeIndex=0; edgeIndex<edgeCount; edgeIndex+=1){
    const fromVertex:number=readNumber();
    const toVertex:number=readNumber();
    const weight:number=readNumber();
    graph[fromVertex].push({toVertex,weight});
}

const INF:number=1_000_000_000;
const distance:number[]=Array.from({length:vertexCount+1}, ()=>INF);
distance[startVertex]=0;

type HeapItem={
    vertex: number;
    distance: number;
}

class MinHeap{
    private items:HeapItem[]=[];
    
    public isEmpty():boolean{
        return this.items.length===0;
    }
    public push(item:HeapItem):void{
        this.items.push(item);
        this.bubbleUp(this.items.length-1);
    }
    
    public pop():HeapItem|undefined{
        if(this.items.length===0) return undefined;
        if(this.items.length===1) return this.items.pop();
        
        const minItem: HeapItem=this.items[0];
        const lastItem: HeapItem=this.items.pop() as HeapItem;
        this.items[0]=lastItem;
        this.bubbleDown(0);
        return minItem;
    }
    
    private bubbleUp(index:number):void{
        let currentIndex: number = index;
        while (currentIndex>0){
            const parentIndex: number = Math.floor((currentIndex - 1) / 2);
            
            if(this.items[parentIndex].distance<=this.items[currentIndex].distance){
                break;
            }
            
            const temp:HeapItem=this.items[parentIndex];
            this.items[parentIndex]=this.items[currentIndex];
            this.items[currentIndex]=temp;
            currentIndex=parentIndex;
        }
    }
    
    private bubbleDown(index:number):void{
        let currentIndex:number=index;
        
        while(true){
            const leftChildIndex:number=currentIndex*2+1;
            const rightChildIndex:number=currentIndex*2+2;
            let smallestIndex:number=currentIndex;
            
            if(
            leftChildIndex<this.items.length&&
            this.items[leftChildIndex].distance<this.items[smallestIndex].distance
            ){
                smallestIndex=leftChildIndex;
            }
            if(
            rightChildIndex<this.items.length&&
            this.items[rightChildIndex].distance<this.items[smallestIndex].distance
            ){
                smallestIndex=rightChildIndex;
            }
            if(smallestIndex===currentIndex){
                break;
            }
            
            const temp: HeapItem = this.items[currentIndex];
            this.items[currentIndex] = this.items[smallestIndex];
            this.items[smallestIndex] = temp;

            currentIndex = smallestIndex;
            }
          }
        }

        const minHeap: MinHeap = new MinHeap();
        minHeap.push({ vertex: startVertex, distance: 0 });

        while (!minHeap.isEmpty()) {
          const current: HeapItem = minHeap.pop() as HeapItem;
          const currentVertex: number = current.vertex;
          const currentDistance: number = current.distance;

          if (currentDistance !== distance[currentVertex]) {
            continue;
          }

          for (const edge of graph[currentVertex]) {
            const nextVertex: number = edge.toVertex;
            const nextDistance: number = currentDistance + edge.weight;

            if (nextDistance < distance[nextVertex]) {
              distance[nextVertex] = nextDistance;
              minHeap.push({ vertex: nextVertex, distance: nextDistance });
            }
          }
        }

        let outputLines: string[] = [];
        for (let vertex = 1; vertex <= vertexCount; vertex += 1) {
          if (distance[vertex] === INF) outputLines.push("INF");
          else outputLines.push(String(distance[vertex]));
        }

        console.log(outputLines.join("\n"));