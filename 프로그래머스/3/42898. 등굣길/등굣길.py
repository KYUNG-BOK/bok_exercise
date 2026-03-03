def solution(m, n, puddles):
    MOD = 1_000_000_007
    blocked = set((x, y) for x, y in puddles)

    dp = [[0] * (m + 1) for _ in range(n + 1)]
    dp[1][1] = 1

    for y in range(1, n + 1):
        for x in range(1, m + 1):
            if (x, y) in blocked or (x == 1 and y == 1):
                continue
            dp[y][x] = (dp[y-1][x] + dp[y][x-1]) % MOD

    return dp[n][m]