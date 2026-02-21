def solution(num_list):
    odd = "".join(str(n) for n in num_list if n % 2)
    even = "".join(str(n) for n in num_list if n % 2 == 0)
    return int(odd) + int(even)