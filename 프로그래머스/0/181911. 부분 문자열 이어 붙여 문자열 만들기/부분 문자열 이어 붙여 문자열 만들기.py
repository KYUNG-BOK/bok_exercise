def solution(my_strings, parts):
    return "".join(st[s:e+1] for st, (s, e) in zip(my_strings, parts))