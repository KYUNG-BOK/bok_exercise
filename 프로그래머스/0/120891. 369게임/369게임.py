def solution(order):
    return sum(1 for c in str(order) if c in '369')