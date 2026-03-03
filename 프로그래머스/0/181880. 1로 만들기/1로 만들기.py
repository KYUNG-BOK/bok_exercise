def solution(num_list):
    cnt = 0
    for v in num_list:
        while v > 1:
            if v % 2 == 0:
                v //= 2
            else:
                v = (v - 1) // 2
            cnt += 1
    return cnt