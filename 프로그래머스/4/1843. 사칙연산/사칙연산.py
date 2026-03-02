def solution(arr):
    nums = list(map(int, arr[0::2]))
    ops = arr[1::2]
    n = len(nums)

    INF = 10**18
    dp_max = [[-INF] * n for _ in range(n)]
    dp_min = [[INF] * n for _ in range(n)]

    for i in range(n):
        dp_max[i][i] = dp_min[i][i] = nums[i]

    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            for k in range(i, j):
                op = ops[k]
                if op == '+':
                    mx = dp_max[i][k] + dp_max[k + 1][j]
                    mn = dp_min[i][k] + dp_min[k + 1][j]
                else:  # '-'
                    mx = dp_max[i][k] - dp_min[k + 1][j]
                    mn = dp_min[i][k] - dp_max[k + 1][j]
                if mx > dp_max[i][j]:
                    dp_max[i][j] = mx
                if mn < dp_min[i][j]:
                    dp_min[i][j] = mn

    return dp_max[0][n - 1]