// 공대선생님들,, 존경스럽습니다....

import * as fs from "fs";

const tokens = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let pointer = 0;

const testCaseCount = Number(tokens[pointer++]);

class MaxHeap {
  private heap: number[] = [];

  public size(): number {
    return this.heap.length;
  }

  public peek(): number {
    return this.heap[0];
  }

  public push(value: number): void {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  public pop(): number {
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      if (this.heap[parentIndex] >= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      let largestIndex = index;
      const leftChildIndex = index * 2 + 1;
      const rightChildIndex = index * 2 + 2;

      if (leftChildIndex < length && this.heap[leftChildIndex] > this.heap[largestIndex]) {
        largestIndex = leftChildIndex;
      }
      if (rightChildIndex < length && this.heap[rightChildIndex] > this.heap[largestIndex]) {
        largestIndex = rightChildIndex;
      }

      if (largestIndex === index) break;
      [this.heap[index], this.heap[largestIndex]] = [this.heap[largestIndex], this.heap[index]];
      index = largestIndex;
    }
  }
}

class MinHeap {
  private heap: number[] = [];

  public size(): number {
    return this.heap.length;
  }

  public peek(): number {
    return this.heap[0];
  }

  public push(value: number): void {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  public pop(): number {
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      if (this.heap[parentIndex] <= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      let smallestIndex = index;
      const leftChildIndex = index * 2 + 1;
      const rightChildIndex = index * 2 + 2;

      if (leftChildIndex < length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
        smallestIndex = leftChildIndex;
      }
      if (rightChildIndex < length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex === index) break;
      [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
      index = smallestIndex;
    }
  }
}

const outputLines: string[] = [];

for (let testCaseIndex = 0; testCaseIndex < testCaseCount; testCaseIndex++) {
  const sequenceLength = Number(tokens[pointer++]);

  const medianCount = (sequenceLength + 1) >> 1;

  const leftMaxHeap = new MaxHeap();
  const rightMinHeap = new MinHeap();

  const medians: number[] = [];

  for (let i = 1; i <= sequenceLength; i++) {
    const value = Number(tokens[pointer++]);

    if (leftMaxHeap.size() === 0 || value <= leftMaxHeap.peek()) {
      leftMaxHeap.push(value);
    } else {
      rightMinHeap.push(value);
    }

    if (leftMaxHeap.size() > rightMinHeap.size() + 1) {
      rightMinHeap.push(leftMaxHeap.pop());
    } else if (rightMinHeap.size() > leftMaxHeap.size()) {
      leftMaxHeap.push(rightMinHeap.pop());
    }

    if (i % 2 === 1) {
      medians.push(leftMaxHeap.peek());
    }
  }

  outputLines.push(String(medianCount));

  for (let i = 0; i < medians.length; i += 10) {
    outputLines.push(medians.slice(i, i + 10).join(" "));
  }
}

console.log(outputLines.join("\n"));
