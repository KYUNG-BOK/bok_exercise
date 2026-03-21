def solution(emergency):
    sorted_list = sorted(emergency, reverse=True)
    return [sorted_list.index(e) + 1 for e in emergency]