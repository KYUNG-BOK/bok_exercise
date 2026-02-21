def solution(num_list):
    prod = 1
    for n in num_list:
        prod *= n
    return int(prod < sum(num_list) ** 2)