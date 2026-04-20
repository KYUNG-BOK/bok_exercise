import sys

sys.setrecursionlimit(300000)

def solution(t):
    n = len(t) + 1
    m = 2 * (n - 1)

    to = [0] * m
    rev = [0] * m
    adj = [[] for _ in range(n)]

    idx = 0
    for a, b in t:
        to[idx] = b
        to[idx + 1] = a
        rev[idx] = idx + 1
        rev[idx + 1] = idx
        adj[a].append(idx)
        adj[b].append(idx + 1)
        idx += 2

    parent = [-1] * n
    parent_edge = [-1] * n
    order = [0]

    for v in order:
        for ei in adj[v]:
            nv = to[ei]
            if nv == parent[v]:
                continue
            parent[nv] = v
            parent_edge[nv] = ei
            order.append(nv)

    c_msg = [0] * m
    d_msg = [0] * m

    def push_top(arr, item, limit):
        arr.append(item)
        i = len(arr) - 1
        while i > 0 and arr[i - 1][0] < arr[i][0]:
            arr[i - 1], arr[i] = arr[i], arr[i - 1]
            i -= 1
        if len(arr) > limit:
            arr.pop()

    def collect_top(v, ban_edge=-1):
        top_c = []
        top_d = []
        for ei in adj[v]:
            if ei == ban_edge:
                continue
            ri = rev[ei]
            push_top(top_c, (c_msg[ri], ei), 4)
            push_top(top_d, (d_msg[ri], ei), 4)
        return top_c, top_d

    def best1_c(top_c, ban_edge=-1):
        for val, ei in top_c:
            if ei != ban_edge:
                return val
        return 0

    def sum2_c(top_c, ban1=-1, ban2=-1):
        total = 0
        cnt = 0
        for val, ei in top_c:
            if ei == ban1 or ei == ban2:
                continue
            total += val
            cnt += 1
            if cnt == 2:
                break
        return total

    def best_dc(top_d, top_c, ban_edge=-1):
        best = 0
        for d_val, d_ei in top_d:
            if d_ei == ban_edge:
                continue
            if d_val > best:
                best = d_val
            for c_val, c_ei in top_c:
                if c_ei == ban_edge or c_ei == d_ei:
                    continue
                cand = d_val + c_val
                if cand > best:
                    best = cand
                break
        return best

    for v in reversed(order):
        if v == 0:
            continue

        p_to_v = parent_edge[v]
        v_to_p = rev[p_to_v]

        top_c, top_d = collect_top(v, v_to_p)
        c_msg[v_to_p] = 1 + best1_c(top_c)
        d_msg[v_to_p] = 1 + max(sum2_c(top_c), best_dc(top_d, top_c))

    answer = 0

    for v in order:
        top_c, top_d = collect_top(v)

        cand1 = 1 + sum(val for val, _ in top_c[:3])
        if cand1 > answer:
            answer = cand1

        for d_val, d_ei in top_d:
            cand2 = 1 + d_val + sum2_c(top_c, d_ei)
            if cand2 > answer:
                answer = cand2

        ld = len(top_d)
        for i in range(ld):
            d1_val, d1_ei = top_d[i]
            for j in range(i + 1, ld):
                d2_val, d2_ei = top_d[j]
                extra = 0
                for c_val, c_ei in top_c:
                    if c_ei != d1_ei and c_ei != d2_ei:
                        extra = c_val
                        break
                cand3 = 1 + d1_val + d2_val + extra
                if cand3 > answer:
                    answer = cand3

        for ei in adj[v]:
            nv = to[ei]
            if nv == parent[v]:
                continue

            c_msg[ei] = 1 + best1_c(top_c, ei)
            d_msg[ei] = 1 + max(sum2_c(top_c, ei), best_dc(top_d, top_c, ei))

    return answer