def solution(dots):
    def slope(a, b):
        return (b[1] - a[1]) / (b[0] - a[0])

    a, b, c, d = dots

    if slope(a, b) == slope(c, d):
        return 1
    if slope(a, c) == slope(b, d):
        return 1
    if slope(a, d) == slope(b, c):
        return 1
    return 0