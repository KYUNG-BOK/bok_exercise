def solution(triangle):
    dp = triangle[0][:]
    for row in triangle[1:]:
        ndp = [0] * len(row)
        for i, v in enumerate(row):
            if i == 0:
                ndp[i] = dp[0] + v
            elif i == len(row) - 1:
                ndp[i] = dp[-1] + v
            else:
                ndp[i] = max(dp[i-1], dp[i]) + v
        dp = ndp
    return max(dp)