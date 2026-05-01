def solution(n, roads):
    graph = [[] for _ in range(n + 1)]
    for a, b in roads:
        graph[a].append(b)

    index_counter = [0]
    index = [0] * (n + 1)
    lowlink = [0] * (n + 1)
    on_stack = [False] * (n + 1)
    index_set = [False] * (n + 1)
    stack = []
    scc_id = [-1] * (n + 1)
    scc_count = [0]

    def strongconnect(v):
        dfs_stack = [(v, iter(graph[v]))]
        index[v] = lowlink[v] = index_counter[0]
        index_counter[0] += 1
        index_set[v] = True
        on_stack[v] = True
        stack.append(v)
        while dfs_stack:
            node, it = dfs_stack[-1]
            try:
                w = next(it)
                if not index_set[w]:
                    index[w] = lowlink[w] = index_counter[0]
                    index_counter[0] += 1
                    index_set[w] = True
                    on_stack[w] = True
                    stack.append(w)
                    dfs_stack.append((w, iter(graph[w])))
                elif on_stack[w]:
                    lowlink[node] = min(lowlink[node], index[w])
            except StopIteration:
                dfs_stack.pop()
                if dfs_stack:
                    parent = dfs_stack[-1][0]
                    lowlink[parent] = min(lowlink[parent], lowlink[node])
                if lowlink[node] == index[node]:
                    sid = scc_count[0]
                    scc_count[0] += 1
                    while True:
                        w = stack.pop()
                        on_stack[w] = False
                        scc_id[w] = sid
                        if w == node:
                            break

    for i in range(1, n + 1):
        if not index_set[i]:
            strongconnect(i)

    sc = scc_count[0]
    scc_edges = set()
    for a, b in roads:
        sa, sb = scc_id[a], scc_id[b]
        if sa != sb:
            scc_edges.add((sa, sb))

    scc_graph = [[] for _ in range(sc)]
    for sa, sb in scc_edges:
        scc_graph[sa].append(sb)

    start_scc = scc_id[1]
    reachable = [False] * sc
    reachable[start_scc] = True
    q = [start_scc]
    while q:
        cur = q.pop()
        for nxt in scc_graph[cur]:
            if not reachable[nxt]:
                reachable[nxt] = True
                q.append(nxt)

    # 각 노드에서 도달 가능한 모든 노드 계산 (transitive closure)
    reach_from = [set() for _ in range(sc)]
    topo = []
    in_deg = [0] * sc
    for sa, sb in scc_edges:
        if reachable[sa] and reachable[sb]:
            in_deg[sb] += 1
    q = [i for i in range(sc) if reachable[i] and in_deg[i] == 0]
    while q:
        cur = q.pop()
        topo.append(cur)
        for nxt in scc_graph[cur]:
            if reachable[nxt]:
                in_deg[nxt] -= 1
                if in_deg[nxt] == 0:
                    q.append(nxt)

    for node in reversed(topo):
        for nxt in scc_graph[node]:
            if reachable[nxt]:
                reach_from[node].add(nxt)
                reach_from[node] |= reach_from[nxt]

    reachable_sccs = [i for i in range(sc) if reachable[i]]

    match_to = [-1] * sc

    def dfs_match(u, visited):
        for v in reach_from[u]:
            if visited[v]:
                continue
            visited[v] = True
            if match_to[v] == -1 or dfs_match(match_to[v], visited):
                match_to[v] = u
                return True
        return False

    matching = 0
    for u in reachable_sccs:
        visited = [False] * sc
        visited[u] = True
        if dfs_match(u, visited):
            matching += 1

    return len(reachable_sccs) - matching - 1