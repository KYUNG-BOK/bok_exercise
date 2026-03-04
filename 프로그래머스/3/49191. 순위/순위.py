def solution(n, results):
    win = [[False] * (n + 1) for _ in range(n + 1)]
    for a, b in results:
        win[a][b] = True

    for k in range(1, n + 1):
        for i in range(1, n + 1):
            if not win[i][k]:
                continue
            for j in range(1, n + 1):
                if win[k][j]:
                    win[i][j] = True

    ans = 0
    for i in range(1, n + 1):
        known = 0
        for j in range(1, n + 1):
            if i == j:
                continue
            if win[i][j] or win[j][i]:
                known += 1
        if known == n - 1:
            ans += 1
    return ans