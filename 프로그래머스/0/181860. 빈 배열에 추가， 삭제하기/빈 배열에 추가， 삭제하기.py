def solution(arr, flag):
    X = []
    for a, f in zip(arr, flag):
        if f:
            X += [a] * (a * 2)
        else:
            del X[-a:]
    return X