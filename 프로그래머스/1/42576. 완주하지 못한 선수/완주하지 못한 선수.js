function solution(participant, completion) {
  const map = new Map();

  for (const name of participant) {
    map.set(name, (map.get(name) || 0) + 1);
  }

  for (const name of completion) {
    map.set(name, map.get(name) - 1);
  }

  for (const [name, cnt] of map) {
    if (cnt === 1) return name;
  }
}