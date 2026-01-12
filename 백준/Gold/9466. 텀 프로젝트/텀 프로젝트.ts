/* 그만해라, 많이 빠꾸먹었잖아, 이젠 제발 통과시켜줘, 통과 가즈아*/

import * as fs from "fs";

const rawInput = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let cursor = 0;

const testCaseCount: number = Number(rawInput[cursor++]);
const results: string[] = [];

for (let testIndex = 0; testIndex < testCaseCount; testIndex++) {
  const studentCount: number = Number(rawInput[cursor++]);

  const selectedStudentOf = new Int32Array(studentCount + 1);
  for (let studentNumber = 1; studentNumber <= studentCount; studentNumber++) {
    selectedStudentOf[studentNumber] = Number(rawInput[cursor++]);
  }

  const visitedFromStart = new Int32Array(studentCount + 1);
  let teamMemberCount: number = 0;

  for (let startStudent = 1; startStudent <= studentCount; startStudent++) {
    if (visitedFromStart[startStudent] !== 0) continue;

    let currentStudent: number = startStudent;

    while (visitedFromStart[currentStudent] === 0) {
      visitedFromStart[currentStudent] = startStudent;
      currentStudent = selectedStudentOf[currentStudent];
    }

    if (visitedFromStart[currentStudent] === startStudent) {
      let cycleCount: number = 1;
      let nextStudent: number = selectedStudentOf[currentStudent];

      while (nextStudent !== currentStudent) {
        cycleCount++;
        nextStudent = selectedStudentOf[nextStudent];
      }

      teamMemberCount += cycleCount;
    }
  }

  const notInTeamCount: number = studentCount - teamMemberCount;
  results.push(String(notInTeamCount));
}

console.log(results.join("\n"));