def solution(my_string):
    result = ''
    for c in my_string:
        if c not in result:
            result += c
    return result