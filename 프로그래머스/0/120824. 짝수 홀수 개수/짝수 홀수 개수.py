def solution(num_list):
    even = sum(1 for x in num_list if x % 2 == 0)
    odd = len(num_list) - even
    return [even, odd]