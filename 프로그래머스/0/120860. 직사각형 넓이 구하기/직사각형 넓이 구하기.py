def solution(dots):
    xs = [x for x, y in dots]
    ys = [y for x, y in dots]
    return (max(xs) - min(xs)) * (max(ys) - min(ys))