def solution(my_string, indices):
    remove = set(indices)
    return ''.join(ch for i, ch in enumerate(my_string) if i not in remove)