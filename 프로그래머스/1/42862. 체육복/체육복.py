def solution(n, lost, reserve):
    lost_set = set(lost)
    reserve_set = set(reserve)

    both = lost_set & reserve_set
    lost_set -= both
    reserve_set -= both

    for r in sorted(reserve_set):
        if r - 1 in lost_set:
            lost_set.remove(r - 1)
        elif r + 1 in lost_set:
            lost_set.remove(r + 1)

    return n - len(lost_set)