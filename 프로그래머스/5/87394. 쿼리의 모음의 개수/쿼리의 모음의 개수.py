MOD = 998244353

def solution(q, a):
    n = len(a)

    fact = [1] * (q + 1)
    invfact = [1] * (q + 1)
    for i in range(1, q + 1):
        fact[i] = fact[i - 1] * i % MOD
    invfact[q] = pow(fact[q], MOD - 2, MOD)
    for i in range(q, 0, -1):
        invfact[i - 1] = invfact[i] * i % MOD

    def conv(x, y):
        res = [0] * (q + 1)
        for i, xv in enumerate(x):
            if xv == 0:
                continue
            limit = q - i
            up = min(len(y) - 1, limit)
            for j in range(up + 1):
                res[i + j] = (res[i + j] + xv * y[j]) % MOD
        return res

    exp_cache = {}

    def exp_series(t):
        if t in exp_cache:
            return exp_cache[t]
        res = [0] * (q + 1)
        p = 1
        t %= MOD
        for k in range(q + 1):
            res[k] = p * invfact[k] % MOD
            p = p * t % MOD
        exp_cache[t] = res
        return res

    ans_poly = [1] + [0] * q
    values = sorted(set(a))
    prev = 0

    for cur in values:
        gap = cur - prev
        i = 0
        while i < n:
            if a[i] < cur:
                i += 1
                continue

            l = i
            while i < n and a[i] >= cur:
                i += 1
            r = i - 1

            length = r - l + 1
            marks = [idx - l + 1 for idx in range(l, r + 1) if a[idx] == cur]

            interval_cnt = length * (length + 1) // 2
            lower_cnt = (gap - 1) * interval_cnt

            pos = [0] + marks
            m = len(marks)

            dp = [[0] * (q + 1) for _ in range(m + 1)]
            dp[0][0] = 1

            for j in range(1, m + 1):
                cur_poly = [0] * (q + 1)
                pj = pos[j]
                for t in range(j):
                    seg = pj - pos[t] - 1
                    w = exp_series(seg * (seg + 1) // 2)
                    tmp = conv(dp[t], w)
                    for k in range(q + 1):
                        cur_poly[k] = (cur_poly[k] - tmp[k]) % MOD
                dp[j] = cur_poly

            cover_poly = [0] * (q + 1)
            for t in range(m + 1):
                seg = length - pos[t]
                w = exp_series(seg * (seg + 1) // 2)
                tmp = conv(dp[t], w)
                for k in range(q + 1):
                    cover_poly[k] = (cover_poly[k] + tmp[k]) % MOD

            comp_poly = conv(exp_series(lower_cnt), cover_poly)
            ans_poly = conv(ans_poly, comp_poly)

        prev = cur

    return ans_poly[q] * fact[q] % MOD