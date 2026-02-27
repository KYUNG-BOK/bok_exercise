def solution(answers):
    p1 = [1, 2, 3, 4, 5]
    p2 = [2, 1, 2, 3, 2, 4, 2, 5]
    p3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]

    s1 = s2 = s3 = 0
    for i, a in enumerate(answers):
        if a == p1[i % len(p1)]:
            s1 += 1
        if a == p2[i % len(p2)]:
            s2 += 1
        if a == p3[i % len(p3)]:
            s3 += 1

    mx = max(s1, s2, s3)
    res = []
    if s1 == mx:
        res.append(1)
    if s2 == mx:
        res.append(2)
    if s3 == mx:
        res.append(3)
    return res