def solution(num_list):
    last, prev = num_list[-1], num_list[-2]
    num_list.append(last - prev if last > prev else last * 2)
    return num_list