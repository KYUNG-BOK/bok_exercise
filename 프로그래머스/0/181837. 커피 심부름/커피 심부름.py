def solution(order):
    return sum(5000 if "cafelatte" in x else 4500 for x in order)