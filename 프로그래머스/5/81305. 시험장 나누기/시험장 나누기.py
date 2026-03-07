import sys
sys.setrecursionlimit(200000)

def solution(k, num, links):
    n = len(num)
    has_parent = [False] * n

    for i in range(n):
        l, r = links[i]
        if l != -1:
            has_parent[l] = True
        if r != -1:
            has_parent[r] = True

    root = 0
    for i in range(n):
        if not has_parent[i]:
            root = i
            break

    def possible(limit):
        def dfs(cur):
            left, right = links[cur]
            group_cnt = 0
            left_sum = 0
            right_sum = 0

            if left != -1:
                c, s = dfs(left)
                group_cnt += c
                left_sum = s

            if right != -1:
                c, s = dfs(right)
                group_cnt += c
                right_sum = s

            w = num[cur]

            if w > limit:
                return k + 1, 0

            if w + left_sum + right_sum <= limit:
                return group_cnt, w + left_sum + right_sum

            smaller = min(left_sum, right_sum)
            if w + smaller <= limit:
                return group_cnt + 1, w + smaller

            return group_cnt + 2, w

        groups, remain = dfs(root)
        return groups + 1 <= k

    lo = max(num)
    hi = sum(num)

    while lo < hi:
        mid = (lo + hi) // 2
        if possible(mid):
            hi = mid
        else:
            lo = mid + 1

    return lo