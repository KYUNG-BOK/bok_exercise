def solution(a):
    MOD = 10_000_019
    n = len(a)
    m = len(a[0])

    comb = [[0] * (n + 1) for _ in range(n + 1)]
    for i in range(n + 1):
        comb[i][0] = 1
        comb[i][i] = 1
        for j in range(1, i):
            comb[i][j] = (comb[i - 1][j - 1] + comb[i - 1][j]) % MOD

    col_count = []
    for c in range(m):
        cnt = 0
        for r in range(n):
            cnt += a[r][c]
        col_count.append(cnt)

    dp = [0] * (n + 1)
    dp[0] = 1

    for ones in col_count:
        ndp = [0] * (n + 1)

        for odd in range(n + 1):
            if dp[odd] == 0:
                continue

            even = n - odd

            for from_odd in range(ones + 1):
                from_even = ones - from_odd

                if from_odd > odd or from_even > even:
                    continue

                next_odd = odd - from_odd + from_even
                ways = comb[odd][from_odd] * comb[even][from_even]
                ndp[next_odd] = (ndp[next_odd] + dp[odd] * ways) % MOD

        dp = ndp

    return dp[0]