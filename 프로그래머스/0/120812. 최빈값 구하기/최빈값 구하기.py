from collections import Counter

def solution(array):
    c = Counter(array)
    m = max(c.values())
    r = [k for k, v in c.items() if v == m]
    return r[0] if len(r) == 1 else -1