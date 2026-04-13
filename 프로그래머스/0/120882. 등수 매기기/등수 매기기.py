def solution(score):
    avg = [sum(s) / 2 for s in score]
    sorted_avg = sorted(avg, reverse=True)
    return [sorted_avg.index(a) + 1 for a in avg]