def solution(sales, links):
    n = len(sales)
    children = [[] for _ in range(n + 1)]

    for a, b in links:
        children[a].append(b)

    dp = [[0, 0] for _ in range(n + 1)]
    stack = [1]
    order = []

    while stack:
        node = stack.pop()
        order.append(node)
        for child in children[node]:
            stack.append(child)

    INF = 10**18

    for node in reversed(order):
        dp[node][1] = sales[node - 1]

        if not children[node]:
            dp[node][0] = 0
            continue

        total = 0
        extra = INF
        has_attendee = False

        for child in children[node]:
            total += min(dp[child][0], dp[child][1])

            if dp[child][1] <= dp[child][0]:
                has_attendee = True
            else:
                extra = min(extra, dp[child][1] - dp[child][0])

        dp[node][1] += total

        if has_attendee:
            dp[node][0] = total
        else:
            dp[node][0] = total + extra

    return min(dp[1][0], dp[1][1])