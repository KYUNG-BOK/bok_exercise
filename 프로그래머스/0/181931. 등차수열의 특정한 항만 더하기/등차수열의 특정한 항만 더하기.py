def solution(a, d, included):
    total = 0
    for i, flag in enumerate(included):
        if flag:
            total += a + i * d
    return total