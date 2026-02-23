from collections import deque

def solution(l, r):
    q = deque(["5"])
    res = []

    while q:
        s = q.popleft()
        x = int(s)

        if x > r:
            continue

        if x >= l:
            res.append(x)

        q.append(s + "0")
        q.append(s + "5")

    res.sort()
    return res if res else [-1]