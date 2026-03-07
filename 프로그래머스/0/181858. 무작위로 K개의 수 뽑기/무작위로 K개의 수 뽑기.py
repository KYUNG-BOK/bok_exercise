def solution(arr, k):
    res = []
    seen = set()

    for x in arr:
        if x not in seen:
            seen.add(x)
            res.append(x)
            if len(res) == k:
                break

    while len(res) < k:
        res.append(-1)

    return res