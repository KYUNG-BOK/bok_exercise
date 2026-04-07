def solution(sides):
    a, b = sorted(sides)
    return (a + b - 1) - (b - a)