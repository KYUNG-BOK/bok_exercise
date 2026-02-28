from itertools import permutations

def solution(k, dungeons):
    best = 0
    for order in permutations(dungeons):
        fatigue = k
        cnt = 0
        for need, cost in order:
            if fatigue < need:
                break
            fatigue -= cost
            cnt += 1
        if cnt > best:
            best = cnt
    return best