def solution(spell, dic):
    target = sorted(spell)
    return 1 if any(sorted(word) == target for word in dic) else 2