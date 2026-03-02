def solution(money):
    n = len(money)

    def rob(arr):
        prev2 = 0
        prev1 = 0
        for x in arr:
            prev2, prev1 = prev1, max(prev1, prev2 + x)
        return prev1

    return max(rob(money[:-1]), rob(money[1:]))