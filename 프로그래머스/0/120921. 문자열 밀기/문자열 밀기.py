def solution(A, B):
    if A == B:
        return 0
    n = len(A)
    temp = A
    for i in range(1, n + 1):
        temp = temp[-1] + temp[:-1]
        if temp == B:
            return i
    return -1