def solution(arr):
    stk = []
    for x in arr:
        if not stk:
            stk.append(x)
        elif stk[-1] == x:
            stk.pop()
        else:
            stk.append(x)
    return stk if stk else [-1]