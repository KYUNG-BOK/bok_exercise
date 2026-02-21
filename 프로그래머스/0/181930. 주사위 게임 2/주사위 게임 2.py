def solution(a, b, c):
    s1 = a + b + c
    s2 = a*a + b*b + c*c
    s3 = a*a*a + b*b*b + c*c*c

    kinds = len({a, b, c})

    if kinds == 3:
        return s1
    elif kinds == 2:
        return s1 * s2
    else:
        return s1 * s2 * s3