import * as fs from "fs";

const rawInput = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let cursor = 0;

const testCaseCount: number = Number(rawInput[cursor++]);
const MAX_BAG_COUNT = 1000000000;

function gcd(left: number, right: number): number {
  while (right !== 0) {
    const remainder = left % right;
    left = right;
    right = remainder;
  }
  return Math.abs(left);
}

function extendedGcd(
  left: number,
  right: number
): { coefficientX: number; coefficientY: number } {
  let currentRemainder: number = left;
  let nextRemainder: number = right;

  let currentCoefficientX: number = 1;
  let nextCoefficientX: number = 0;

  let currentCoefficientY: number = 0;
  let nextCoefficientY: number = 1;

  while (nextRemainder !== 0) {
    const quotient = Math.trunc(currentRemainder / nextRemainder);

    const temporaryRemainder = currentRemainder - quotient * nextRemainder;
    currentRemainder = nextRemainder;
    nextRemainder = temporaryRemainder;

    const temporaryX = currentCoefficientX - quotient * nextCoefficientX;
    currentCoefficientX = nextCoefficientX;
    nextCoefficientX = temporaryX;

    const temporaryY = currentCoefficientY - quotient * nextCoefficientY;
    currentCoefficientY = nextCoefficientY;
    nextCoefficientY = temporaryY;
  }

  return {
    coefficientX: currentCoefficientX,
    coefficientY: currentCoefficientY,
  };
}

const answers: string[] = [];

for (let testIndex = 0; testIndex < testCaseCount; testIndex++) {
  const peopleCount = Number(rawInput[cursor++]);   // K
  const candiesPerBag = Number(rawInput[cursor++]); // C

  if (peopleCount === 1 && candiesPerBag === 1) {
    answers.push("2");
    continue;
  }

  if (peopleCount === 1 && candiesPerBag > 1) {
    answers.push("1");
    continue;
  }

  if (candiesPerBag === 1) {
    const requiredBagCount = peopleCount + 1;
    if (requiredBagCount > MAX_BAG_COUNT) {
      answers.push("IMPOSSIBLE");
    } else {
      answers.push(String(requiredBagCount));
    }
    continue;
  }

  if (gcd(candiesPerBag, peopleCount) !== 1) {
    answers.push("IMPOSSIBLE");
    continue;
  }

  const { coefficientX } = extendedGcd(candiesPerBag, peopleCount);

  let candidateBagCount = coefficientX % peopleCount;
  if (candidateBagCount < 0) {
    candidateBagCount += peopleCount;
  }

  if (candidateBagCount <= 0 || candidateBagCount > MAX_BAG_COUNT) {
    answers.push("IMPOSSIBLE");
  } else {
    answers.push(String(candidateBagCount));
  }
}

console.log(answers.join("\n"));

// 제발, .....! 가즈아