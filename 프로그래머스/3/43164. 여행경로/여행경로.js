function solution(tickets) {
  const graph = new Map();

  for (const [from, to] of tickets) {
    if (!graph.has(from)) graph.set(from, []);
    graph.get(from).push(to);
  }

  for (const [from, list] of graph) {
    list.sort().reverse();
  }

  const route = [];

  function dfs(airport) {
    const nextAirports = graph.get(airport) || [];

    while (nextAirports.length > 0) {
      const next = nextAirports.pop();
      dfs(next);
    }

    route.push(airport);
  }

  dfs("ICN");

  return route.reverse();
}