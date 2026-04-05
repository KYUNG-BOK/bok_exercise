from collections import deque

def solution(grid):
    n = len(grid)
    m = len(grid[0])
    v = 2 * n * m
    adj = [[] for _ in range(v)]

    def node(r, c, t):
        return (r * m + c) * 2 + t

    for r in range(n - 1):
        for c in range(m):
            a = node(r, c, 1)
            b = node(r + 1, c, 0)
            adj[a].append(b)
            adj[b].append(a)

    for r in range(n):
        for c in range(m - 1):
            a = node(r, c, 0 if grid[r][c] == -1 else 1)
            b = node(r, c + 1, 1 if grid[r][c + 1] == -1 else 0)
            adj[a].append(b)
            adj[b].append(a)

    def longest_unique(arr, is_cycle):
        if not is_cycle:
            cnt = {}
            left = 0
            best = 0
            for right, x in enumerate(arr):
                cnt[x] = cnt.get(x, 0) + 1
                while cnt[x] > 1:
                    y = arr[left]
                    cnt[y] -= 1
                    if cnt[y] == 0:
                        del cnt[y]
                    left += 1
                best = max(best, right - left + 1)
            return best

        size = len(arr)
        arr2 = arr + arr
        cnt = {}
        left = 0
        best = 0
        for right, x in enumerate(arr2):
            cnt[x] = cnt.get(x, 0) + 1
            while cnt[x] > 1 or right - left + 1 > size:
                y = arr2[left]
                cnt[y] -= 1
                if cnt[y] == 0:
                    del cnt[y]
                left += 1
            best = max(best, right - left + 1)
        return best

    visited = [False] * v
    answer = 1

    for s in range(v):
        if visited[s]:
            continue

        q = deque([s])
        visited[s] = True
        comp = []

        while q:
            cur = q.popleft()
            comp.append(cur)
            for nxt in adj[cur]:
                if not visited[nxt]:
                    visited[nxt] = True
                    q.append(nxt)

        is_cycle = all(len(adj[x]) == 2 for x in comp)

        if not is_cycle:
            start = next((x for x in comp if len(adj[x]) <= 1), comp[0])
            order = []
            prev = -1
            cur = start
            while cur != -1:
                order.append(cur // 2)
                nxt = -1
                for to in adj[cur]:
                    if to != prev:
                        nxt = to
                        break
                prev, cur = cur, nxt
        else:
            start = comp[0]
            order = []
            prev = -1
            cur = start
            while True:
                order.append(cur // 2)
                a, b = adj[cur]
                nxt = a if a != prev else b
                prev, cur = cur, nxt
                if cur == start:
                    break

        answer = max(answer, longest_unique(order, is_cycle))

    return answer

# 드뎌 풀었등어ㅏ