def solution(visible, hidden, k):
    n = len(visible)
    m = len(visible[0])
    full_visit = (n % 2 == 1 or m % 2 == 1)
    limit = 1 << n

    bit_count = [0] * limit
    for mask in range(1, limit):
        bit_count[mask] = bit_count[mask >> 1] + (mask & 1)

    answer = 0

    for mask in range(limit):
        total = -k * bit_count[mask]
        best_loss = -10**18

        for j in range(m):
            s0 = 0
            s1 = -k

            if not full_visit:
                mn0 = 10**9
                mn1 = 10**9

            for i in range(n):
                if (mask >> i) & 1:
                    v0 = hidden[i][j]
                    v1 = visible[i][j]
                else:
                    v0 = visible[i][j]
                    v1 = hidden[i][j]

                s0 += v0
                s1 += v1

                if not full_visit and ((i + j) & 1):
                    if v0 < mn0:
                        mn0 = v0
                    if v1 < mn1:
                        mn1 = v1

            if s0 >= s1:
                best_col = s0
            else:
                best_col = s1

            total += best_col

            if not full_visit:
                c0 = s0 - mn0
                c1 = s1 - mn1
                best_skip_col = c0 if c0 >= c1 else c1
                loss = best_skip_col - best_col
                if loss > best_loss:
                    best_loss = loss

        if not full_visit:
            total += best_loss

        if total > answer:
            answer = total

    return answer