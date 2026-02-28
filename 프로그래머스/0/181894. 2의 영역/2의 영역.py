def solution(arr):
    first = last = -1
    for i, v in enumerate(arr):
        if v == 2:
            if first == -1:
                first = i
            last = i
    if first == -1:
        return [-1]
    return arr[first:last+1]