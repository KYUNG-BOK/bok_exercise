def solution(n):
    result = []
    i = 2
    while i <= n:
        if n % i == 0:
            result.append(i)
            while n % i == 0:
                n //= i
        i += 1
    return result