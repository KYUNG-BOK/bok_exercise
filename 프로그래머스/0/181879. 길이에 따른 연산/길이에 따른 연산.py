def solution(num_list):
    if len(num_list) >= 11:
        return sum(num_list)
    p = 1
    for x in num_list:
        p *= x
    return p