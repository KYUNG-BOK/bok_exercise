import sys
from collections import deque

input = sys.stdin.readline

n = int(input())
graph = [[] for _ in range(n + 1)]

for _ in range(n - 1):
    a, b = map(int, input().split())
    graph[a].append(b)
    graph[b].append(a)

parent = [0] * (n + 1)
visited = [False] * (n + 1)

q = deque([1])
visited[1] = True

while q:
    now = q.popleft()
    for nxt in graph[now]:
        if not visited[nxt]:
            visited[nxt] = True
            parent[nxt] = now
            q.append(nxt)

for i in range(2, n + 1):
    print(parent[i])