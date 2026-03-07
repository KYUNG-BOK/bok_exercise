def solution(arr):
    X = []
    for a in arr:
        X += [a] * a
    return X