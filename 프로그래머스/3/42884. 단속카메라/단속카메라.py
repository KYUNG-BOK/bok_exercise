def solution(routes):
    routes.sort(key=lambda x: x[1])
    cam = -10**9
    ans = 0
    for s, e in routes:
        if cam < s:
            ans += 1
            cam = e
    return ans