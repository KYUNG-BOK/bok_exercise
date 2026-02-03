import sys

it = iter(sys.stdin.buffer.read().split())
T = int(next(it))
out = []

for _ in range(T):
    N = int(next(it))
    parent = [0] * (N + 1)
    has_parent = [False] * (N + 1)

    for _ in range(N - 1):
        a = int(next(it))
        b = int(next(it))
        parent[b] = a
        has_parent[b] = True

    u = int(next(it))
    v = int(next(it))

    vis = [False] * (N + 1)
    x = u
    while x != 0:
        vis[x] = True
        x = parent[x]

    y = v
    while not vis[y]:
        y = parent[y]

    out.append(str(y))

sys.stdout.write("\n".join(out))