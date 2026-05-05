def solution(a, s):
    MOD = 1_000_000_007
    answer = []
    offset = 0

    for length in s:
        end_maps = [dict() for _ in range(length)]
        dp = [0] * (length + 1)
        dp[0] = 1

        for r in range(length):
            l = r
            total = a[offset + r]

            while True:
                end_maps[r][total] = l
                dp[r + 1] = (dp[r + 1] + dp[l]) % MOD

                if l == 0:
                    break

                prev = end_maps[l - 1].get(total)

                if prev is None:
                    break

                l = prev
                total *= 2

        answer.append(dp[length] % MOD)
        offset += length

    return answer