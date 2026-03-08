def solution(arr):
    n = len(arr)
    p = 1
    while p < n:
        p *= 2
    return arr + [0] * (p - n)