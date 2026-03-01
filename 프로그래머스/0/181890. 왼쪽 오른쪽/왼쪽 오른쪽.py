def solution(str_list):
    for i, v in enumerate(str_list):
        if v == "l":
            return str_list[:i]
        if v == "r":
            return str_list[i+1:]
    return []