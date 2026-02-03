# 일주일만에 정답가나요?!.... 제발 이젠 보내주세요. 얘도...

import sys
from collections import deque

data = list(map(int, sys.stdin.buffer.read().split()))
it = iter(data)

N = next(it)
g = [[] for _ in range(N + 1)]
for _ in range(N - 1):
    a = next(it); b = next(it); c = next(it)
    g[a].append((b, c))
    g[b].append((a, c))

LOG = (N).bit_length()
up = [[0] * (N + 1) for _ in range(LOG)]
mn = [[0] * (N + 1) for _ in range(LOG)]
mx = [[0] * (N + 1) for _ in range(LOG)]
depth = [-1] * (N + 1)

INF = 10**18

q = deque([1])
depth[1] = 0
up[0][1] = 0
mn[0][1] = INF
mx[0][1] = 0

while q:
    v = q.popleft()
    for to, w in g[v]:
        if depth[to] != -1:
            continue
        depth[to] = depth[v] + 1
        up[0][to] = v
        mn[0][to] = w
        mx[0][to] = w
        q.append(to)

for k in range(1, LOG):
    p = up[k - 1]
    cur = up[k]
    mn_prev = mn[k - 1]
    mx_prev = mx[k - 1]
    mn_cur = mn[k]
    mx_cur = mx[k]
    for v in range(1, N + 1):
        mid = p[v]
        cur[v] = p[mid]
        mn_cur[v] = mn_prev[v] if mn_prev[v] < mn_prev[mid] else mn_prev[mid]
        mx_cur[v] = mx_prev[v] if mx_prev[v] > mx_prev[mid] else mx_prev[mid]

def query(a, b):
    if a == b:
        return 0, 0

    if depth[a] < depth[b]:
        a, b = b, a

    minv = INF
    maxv = 0

    diff = depth[a] - depth[b]
    bit = 0
    while diff:
        if diff & 1:
            if mn[bit][a] < minv: minv = mn[bit][a]
            if mx[bit][a] > maxv: maxv = mx[bit][a]
            a = up[bit][a]
        diff >>= 1
        bit += 1

    if a == b:
        return minv, maxv

    for k in range(LOG - 1, -1, -1):
        if up[k][a] != up[k][b]:
            if mn[k][a] < minv: minv = mn[k][a]
            if mx[k][a] > maxv: maxv = mx[k][a]
            if mn[k][b] < minv: minv = mn[k][b]
            if mx[k][b] > maxv: maxv = mx[k][b]
            a = up[k][a]
            b = up[k][b]

    if mn[0][a] < minv: minv = mn[0][a]
    if mx[0][a] > maxv: maxv = mx[0][a]
    if mn[0][b] < minv: minv = mn[0][b]
    if mx[0][b] > maxv: maxv = mx[0][b]

    return minv, maxv

K = next(it)
out = []
for _ in range(K):
    d = next(it); e = next(it)
    mnv, mxv = query(d, e)
    out.append(f"{mnv} {mxv}")

sys.stdout.write("\n".join(out))