def solution(n):
    num = 0
    count = 0
    while count < n:
        num += 1
        if num % 3 != 0 and '3' not in str(num):
            count += 1
    return num