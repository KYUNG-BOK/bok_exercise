from collections import deque
import heapq

def solution(n, z, roads, queries):
    graph = [[] for _ in range(n)]
    for u, v, w in roads:
        graph[u].append((v, w))

    pareto_s = [[] for _ in range(n * z)]
    hub_pareto = [[] for _ in range(z)]

    def add_p(pl, cost, earn):
        for c, e in pl:
            if c <= cost and e <= earn:
                return False
        new_pl = [(c, e) for c, e in pl if not (c >= cost and e >= earn)]
        new_pl.append((cost, earn))
        new_pl.sort()
        pl.clear(); pl.extend(new_pl)
        return True

    add_p(pareto_s[0], 0, 0)
    pq = [(0, 0, 0, 0)]

    while pq:
        cost, earn, tp, idx = heapq.heappop(pq)
        if tp == 0:
            pl = pareto_s[idx]
            if not any(c == cost and e == earn for c, e in pl):
                continue
            city = idx // z; mod = idx % z
            if add_p(hub_pareto[mod], cost + 1, earn):
                heapq.heappush(pq, (cost + 1, earn, 1, mod))
            for v, w in graph[city]:
                nmod = (mod + w) % z; ne = earn + w
                ew = 0 if (mod + w >= z) else 1
                nidx = v * z + nmod
                if add_p(pareto_s[nidx], cost + ew, ne):
                    heapq.heappush(pq, (cost + ew, ne, 0, nidx))
        else:
            mod = idx
            if not any(c == cost and e == earn for c, e in hub_pareto[mod]):
                continue
            for city in range(n):
                nidx = city * z + mod
                if add_p(pareto_s[nidx], cost, earn):
                    heapq.heappush(pq, (cost, earn, 0, nidx))

    mod_pareto = [[] for _ in range(z)]
    for mod in range(z):
        cem = {}
        for city in range(n):
            for cost, earn in pareto_s[city * z + mod]:
                if cost not in cem or cem[cost] > earn:
                    cem[cost] = earn
        frontier = []; min_e = float('inf')
        for cost in sorted(cem):
            e = cem[cost]
            if e < min_e:
                min_e = e; frontier.append((cost, e))
        mod_pareto[mod] = frontier

    result = []
    for c in queries:
        r = int(c % z); q = (c - r) // z
        best = float('inf')
        for cost, em in mod_pareto[r]:
            if em <= c:
                best = cost + q; break
        result.append(best if best < float('inf') else -1)
    return result