from collections import deque

def solution(rc, operations):
    n = len(rc)
    m = len(rc[0])

    left = deque()
    right = deque()
    middle = deque()

    for row in rc:
        left.append(row[0])
        right.append(row[-1])
        middle.append(deque(row[1:-1]))

    for op in operations:
        if op == "ShiftRow":
            left.rotate(1)
            right.rotate(1)
            middle.rotate(1)
        else:
            if m == 2:
                top = left.popleft()
                right.appendleft(top)
                bottom = right.pop()
                left.append(bottom)
            else:
                top = left.popleft()
                middle[0].appendleft(top)

                top_right = middle[0].pop()
                right.appendleft(top_right)

                bottom_right = right.pop()
                middle[-1].append(bottom_right)

                bottom_left = middle[-1].popleft()
                left.append(bottom_left)

    answer = []
    for i in range(n):
        answer.append([left[i]] + list(middle[i]) + [right[i]])
    return answer