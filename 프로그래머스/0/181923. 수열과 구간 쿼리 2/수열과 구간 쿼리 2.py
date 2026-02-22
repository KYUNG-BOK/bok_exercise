def solution(arr, queries):
    out = []
    for s, e, k in queries:
        cand = [x for x in arr[s:e+1] if x > k]
        out.append(min(cand) if cand else -1)
    return out