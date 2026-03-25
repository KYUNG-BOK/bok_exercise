def solution(n):
    i = 1
    fact = 1
    while fact <= n:
        i += 1
        fact *= i
    return i - 1