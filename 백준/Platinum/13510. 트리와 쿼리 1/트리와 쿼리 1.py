import sys

data = list(map(int, sys.stdin.buffer.read().split()))
it = iter(data)

N = next(it)

g = [[] for _ in range(N + 1)]
w = [0] * N
eu = [0] * N
ev = [0] * N

for i in range(1, N):
    u = next(it); v = next(it); c = next(it)
    eu[i] = u
    ev[i] = v
    w[i] = c
    g[u].append((v, i))
    g[v].append((u, i))

parent = [0] * (N + 1)
depth = [0] * (N + 1)
size = [0] * (N + 1)
heavy = [0] * (N + 1)
par_edge = [0] * (N + 1)
edge_child = [0] * N

stack = [(1, 0, 0)]
order = []
while stack:
    v, p, s = stack.pop()
    if s == 0:
        stack.append((v, p, 1))
        order.append(v)
        for to, eid in g[v]:
            if to == p:
                continue
            parent[to] = v
            depth[to] = depth[v] + 1
            par_edge[to] = eid
            edge_child[eid] = to
            stack.append((to, v, 0))

for v in reversed(order):
    sz = 1
    hv = 0
    hs = 0
    for to, _ in g[v]:
        if to == parent[v]:
            continue
        sz += size[to]
        if size[to] > hs:
            hs = size[to]
            hv = to
    size[v] = sz
    heavy[v] = hv

head = [0] * (N + 1)
pos = [0] * (N + 1)
cur = 0
stack = [(1, 1)]
while stack:
    v, h = stack.pop()
    while v:
        head[v] = h
        pos[v] = cur
        cur += 1
        hv = heavy[v]
        for to, _ in g[v]:
            if to != parent[v] and to != hv:
                stack.append((to, to))
        v = hv

base = [0] * N
for v in range(2, N + 1):
    base[pos[v]] = w[par_edge[v]]

S = 1
while S < N:
    S <<= 1
seg = [0] * (2 * S)
seg[S:S + N] = base
for i in range(S - 1, 0, -1):
    seg[i] = seg[i << 1] if seg[i << 1] >= seg[i << 1 | 1] else seg[i << 1 | 1]

def upd(i, v):
    i += S
    seg[i] = v
    i >>= 1
    while i:
        a = seg[i << 1]
        b = seg[i << 1 | 1]
        seg[i] = a if a >= b else b
        i >>= 1

def qry(l, r):
    res = 0
    l += S
    r += S
    while l < r:
        if l & 1:
            if seg[l] > res:
                res = seg[l]
            l += 1
        if r & 1:
            r -= 1
            if seg[r] > res:
                res = seg[r]
        l >>= 1
        r >>= 1
    return res

def path(u, v):
    res = 0
    while head[u] != head[v]:
        if depth[head[u]] < depth[head[v]]:
            u, v = v, u
        hu = head[u]
        t = qry(pos[hu], pos[u] + 1)
        if t > res:
            res = t
        u = parent[hu]
    if u == v:
        return res
    if depth[u] < depth[v]:
        u, v = v, u
    t = qry(pos[v] + 1, pos[u] + 1)
    if t > res:
        res = t
    return res

M = next(it)
ans = []
for _ in range(M):
    t = next(it)
    if t == 1:
        eid = next(it)
        c = next(it)
        upd(pos[edge_child[eid]], c)
    else:
        u = next(it)
        v = next(it)
        ans.append(str(path(u, v)))

print("\n".join(ans))