import heapq

def solution(n, roads):
    INF = 10**30

    # graph[u] = (v, w, idx)
    graph = [[] for _ in range(n + 1)]
    edges = []

    for idx, (u, v, l, t) in enumerate(roads, start=1):
        w = l + t
        edges.append((u, v, l, t, w, idx))
        graph[u].append((v, w, idx))
        graph[v].append((u, w, idx))

    # 시작점에서 각 노드까지 최단거리
    def dijkstra(start):
        dist = [INF] * (n + 1)
        dist[start] = 0
        pq = [(0, start)]

        while pq:
            cd, u = heapq.heappop(pq)
            if cd > dist[u]:
                continue

            for v, w, _ in graph[u]:
                nd = cd + w
                if nd < dist[v]:
                    dist[v] = nd
                    heapq.heappush(pq, (nd, v))

        return dist

    distS = dijkstra(1)
    distT = dijkstra(n)
    shortest = distS[n]

    MOD1 = 1_000_000_007
    MOD2 = 1_000_000_009

    order = sorted(range(1, n + 1), key=lambda x: distS[x])
    rev_order = order[::-1]

    cntS1 = [0] * (n + 1)
    cntS2 = [0] * (n + 1)
    cntS1[1] = cntS2[1] = 1

    # 1 -> 각 노드까지 최단경로 개수
    for u in order:
        if distS[u] == INF:
            continue
        for v, w, _ in graph[u]:
            # u -> v 방향이 shortest path DAG에 들어가는 경우
            if distS[u] + w == distS[v]:
                cntS1[v] = (cntS1[v] + cntS1[u]) % MOD1
                cntS2[v] = (cntS2[v] + cntS2[u]) % MOD2

    cntT1 = [0] * (n + 1)
    cntT2 = [0] * (n + 1)
    cntT1[n] = cntT2[n] = 1

    # 각 노드 -> n 까지 최단경로 개수
    for u in rev_order:
        if distS[u] == INF:
            continue
        for v, w, _ in graph[u]:
            if distS[u] + w == distS[v]:
                cntT1[u] = (cntT1[u] + cntT1[v]) % MOD1
                cntT2[u] = (cntT2[u] + cntT2[v]) % MOD2

    total1 = cntS1[n]
    total2 = cntS2[n]

    important = set()

    for u, v, l, t, w, idx in edges:
        # shortest path DAG 상에서 방향을 맞춘다.
        if distS[u] + w == distS[v] and distS[u] + w + distT[v] == shortest:
            ways1 = (cntS1[u] * cntT1[v]) % MOD1
            ways2 = (cntS2[u] * cntT2[v]) % MOD2
            if ways1 == total1 and ways2 == total2:
                important.add(idx)

        elif distS[v] + w == distS[u] and distS[v] + w + distT[u] == shortest:
            ways1 = (cntS1[v] * cntT1[u]) % MOD1
            ways2 = (cntS2[v] * cntT2[u]) % MOD2
            if ways1 == total1 and ways2 == total2:
                important.add(idx)

    for u, v, l, t, w, idx in edges:
        can_decrease = False

        if distS[u] <= distS[v] and distT[v] <= distT[u]:
            if distS[u] + l + distT[v] < shortest:
                can_decrease = True

        if distS[v] <= distS[u] and distT[u] <= distT[v]:
            if distS[v] + l + distT[u] < shortest:
                can_decrease = True

        if can_decrease:
            important.add(idx)

    if not important:
        return [-1]

    return sorted(important)