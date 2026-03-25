def solution(n):
    count = 0
    for i in range(1, n + 1):
        divisors = 0
        for j in range(1, i + 1):
            if i % j == 0:
                divisors += 1
        if divisors >= 3:
            count += 1
    return count