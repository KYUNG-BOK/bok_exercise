def solution(strArr):
    cnt = {}
    for s in strArr:
        l = len(s)
        cnt[l] = cnt.get(l, 0) + 1
    return max(cnt.values())