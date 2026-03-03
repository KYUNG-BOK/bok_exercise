def solution(arr):
    x = 0
    while True:
        nxt = []
        changed = False
        for v in arr:
            if v >= 50 and v % 2 == 0:
                nv = v // 2
            elif v < 50 and v % 2 == 1:
                nv = v * 2 + 1
            else:
                nv = v
            if nv != v:
                changed = True
            nxt.append(nv)
        if not changed:
            return x
        arr = nxt
        x += 1