def solution(my_string):
    num = ''
    total = 0
    for c in my_string:
        if c.isdigit():
            num += c
        else:
            if num:
                total += int(num)
                num = ''
    if num:
        total += int(num)
    return total