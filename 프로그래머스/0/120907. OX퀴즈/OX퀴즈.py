def solution(quiz):
    result = []
    for q in quiz:
        x, op, y, _, z = q.split()
        x, y, z = int(x), int(y), int(z)
        if op == '+':
            result.append('O' if x + y == z else 'X')
        else:
            result.append('O' if x - y == z else 'X')
    return result