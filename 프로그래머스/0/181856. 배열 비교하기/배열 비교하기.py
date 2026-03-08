def solution(arr1, arr2):
    if len(arr1) != len(arr2):
        return 1 if len(arr1) > len(arr2) else -1
    
    s1, s2 = sum(arr1), sum(arr2)
    if s1 > s2:
        return 1
    elif s1 < s2:
        return -1
    else:
        return 0