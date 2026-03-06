import sys

sys.setrecursionlimit(1_000_000)

def solution(n, queries):
    m = n + len(queries) * 2 + 5

    left = [0] * m
    right = [0] * m
    tpar = [0] * m
    prio = [0] * m
    tm = [0] * m
    up = list(range(m))

    seed = 2463534242

    def rnd():
        nonlocal seed
        seed ^= (seed << 13) & 0xffffffff
        seed ^= (seed >> 17)
        seed ^= (seed << 5) & 0xffffffff
        return seed & 0xffffffff

    def find(x):
        r = x
        while up[r] != r:
            r = up[r]
        while up[x] != x:
            nx = up[x]
            up[x] = r
            x = nx
        return r

    def set_left(p, c):
        left[p] = c
        if c:
            tpar[c] = p

    def set_right(p, c):
        right[p] = c
        if c:
            tpar[c] = p

    def root(x):
        while tpar[x]:
            x = tpar[x]
        return x

    def merge(a, b):
        if not a:
            if b:
                tpar[b] = 0
            return b
        if not b:
            if a:
                tpar[a] = 0
            return a
        if prio[a] < prio[b]:
            nr = merge(right[a], b)
            set_right(a, nr)
            tpar[a] = 0
            return a
        else:
            nl = merge(a, left[b])
            set_left(b, nl)
            tpar[b] = 0
            return b

    def split_lt(v, key):
        if not v:
            return 0, 0
        if tm[v] < key:
            a, b = split_lt(right[v], key)
            set_right(v, a)
            tpar[v] = 0
            if b:
                tpar[b] = 0
            return v, b
        else:
            a, b = split_lt(left[v], key)
            set_left(v, b)
            tpar[v] = 0
            if a:
                tpar[a] = 0
            return a, v

    def split_le(v, key):
        if not v:
            return 0, 0
        if tm[v] <= key:
            a, b = split_le(right[v], key)
            set_right(v, a)
            tpar[v] = 0
            if b:
                tpar[b] = 0
            return v, b
        else:
            a, b = split_le(left[v], key)
            set_left(v, b)
            tpar[v] = 0
            if a:
                tpar[a] = 0
            return a, v

    def reparent(v, p):
        if not v:
            return
        stack = [v]
        while stack:
            x = stack.pop()
            up[x] = p
            if left[x]:
                stack.append(left[x])
            if right[x]:
                stack.append(right[x])

    for i in range(1, n + 1):
        prio[i] = rnd()
        tm[i] = 0
        up[i] = i

    nxt = n
    ans = []

    for qi, (q, x, y) in enumerate(queries, 1):
        x += 1
        y += 1

        sx = find(x)
        sy = find(y)
        rx = root(sx)
        ry = root(sy)

        if q == 1:
            if rx == ry:
                continue

            nxt += 1
            z = nxt
            prio[z] = rnd()
            tm[z] = qi
            up[z] = z
            left[z] = 0
            right[z] = 0
            tpar[z] = 0

            reparent(ry, z)
            merge(rx, z)

        elif q == 2:
            tx = tm[sx]
            ty = tm[sy]

            if tx <= ty:
                a, bc = split_lt(rx, tx)
                b, c = split_le(bc, ty)
                merge(a, c)

                if b:
                    nxt += 1
                    z = nxt
                    prio[z] = rnd()
                    tm[z] = qi
                    up[z] = z
                    left[z] = 0
                    right[z] = 0
                    tpar[z] = 0

                    reparent(b, z)

        else:
            ans.append("Yes" if rx == ry else "No")

    return ans