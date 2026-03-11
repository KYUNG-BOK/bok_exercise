def solution(arr, delete_list):
    s = set(delete_list)
    return [x for x in arr if x not in s]