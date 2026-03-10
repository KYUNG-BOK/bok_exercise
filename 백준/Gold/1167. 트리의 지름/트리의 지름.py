import sys
from collections import deque

input = sys.stdin.readline

v = int(input())
graph = [[] for _ in range(v + 1)]

for _ in range(v):
    data = list(map(int, input().split()))
    node = data[0]
    i = 1
    while data[i] != -1:
        nxt = data[i]
        cost = data[i + 1]
        graph[node].append((nxt, cost))
        i += 2

def bfs(start):
    dist = [-1] * (v + 1)
    dist[start] = 0
    q = deque([start])

    while q:
        now = q.popleft()
        for nxt, cost in graph[now]:
            if dist[nxt] == -1:
                dist[nxt] = dist[now] + cost
                q.append(nxt)

    max_node = 1
    for i in range(2, v + 1):
        if dist[i] > dist[max_node]:
            max_node = i

    return max_node, dist[max_node]

far_node, _ = bfs(1)
_, answer = bfs(far_node)

print(answer)