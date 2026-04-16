def solution(n, count):
    mod = 1000000007

    comb = [[0] * (n + 1) for _ in range(n + 1)]
    for i in range(n + 1):
        comb[i][0] = 1
        comb[i][i] = 1
        for j in range(1, i):
            comb[i][j] = (comb[i - 1][j - 1] + comb[i - 1][j]) % mod

    dp = [[0] * (n + 1) for _ in range(n + 1)]
    total = [0] * (n + 1)
    g = [0] * (n + 1)

    dp[0][0] = 1
    total[0] = 1
    g[0] = 1

    for i in range(1, n + 1):
        for k in range(1, i + 1):
            value = 0
            for left in range(i):
                value = (value + comb[i - 1][left] * dp[left][k - 1] * g[i - 1 - left]) % mod
            dp[i][k] = value

        total[i] = sum(dp[i]) % mod

        value = 0
        for left in range(i + 1):
            value = (value + comb[i][left] * total[left] * total[i - left]) % mod
        g[i] = value

    return dp[n][count]