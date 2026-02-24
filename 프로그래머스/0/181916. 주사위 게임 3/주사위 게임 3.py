from collections import Counter

def solution(a, b, c, d):
    cnt = Counter([a, b, c, d])
    items = cnt.most_common()

    if items[0][1] == 4:
        p = items[0][0]
        return 1111 * p

    if items[0][1] == 3:
        p = items[0][0]
        q = items[1][0]
        return (10 * p + q) ** 2

    if items[0][1] == 2 and items[1][1] == 2:
        p = items[0][0]
        q = items[1][0]
        return (p + q) * abs(p - q)

    if items[0][1] == 2:
        q = items[1][0]
        r = items[2][0]
        return q * r

    return min(a, b, c, d)