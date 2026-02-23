def solution(arr, queries):
    for s, e, k in queries:
        if k == 0:
            if s <= 0 <= e:
                arr[0] += 1
            continue

        start = ((s + k - 1) // k) * k
        for i in range(start, e + 1, k):
            arr[i] += 1
    return arr