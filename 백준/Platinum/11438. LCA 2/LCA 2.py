# 선생님, 오늘은 합격시켜주세요 ㅠ-ㅠ

import sys
from collections import deque
from array import array

data = list(map(int, sys.stdin.buffer.read().split()))
it = iter(data)

N = next(it)
g = [[] for _ in range(N + 1)]
for _ in range(N - 1):
    a = next(it); b = next(it)
    g[a].append(b)
    g[b].append(a)

LOG = (N).bit_length()
up = [array('I', [0]) * (N + 1) for _ in range(LOG)]
depth = array('i', [-1]) * (N + 1)

q = deque([1])
depth[1] = 0

while q:
    v = q.popleft()
    for to in g[v]:
        if depth[to] != -1:
            continue
        depth[to] = depth[v] + 1
        up[0][to] = v
        q.append(to)

for k in range(1, LOG):
    prev = up[k - 1]
    cur = up[k]
    for v in range(1, N + 1):
        cur[v] = prev[prev[v]]

def lca(a, b):
    if depth[a] < depth[b]:
        a, b = b, a

    diff = depth[a] - depth[b]
    bit = 0
    while diff:
        if diff & 1:
            a = up[bit][a]
        diff >>= 1
        bit += 1

    if a == b:
        return a

    for k in range(LOG - 1, -1, -1):
        if up[k][a] != up[k][b]:
            a = up[k][a]
            b = up[k][b]
    return up[0][a]

M = next(it)
out = []
for _ in range(M):
    a = next(it); b = next(it)
    out.append(str(lca(a, b)))

sys.stdout.write("\n".join(out))