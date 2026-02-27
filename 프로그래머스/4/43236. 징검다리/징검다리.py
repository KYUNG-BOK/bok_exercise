def solution(distance, rocks, n):
    rocks.sort()
    rocks.append(distance)

    left, right = 1, distance
    answer = 0

    while left <= right:
        mid = (left + right) // 2

        removed = 0
        prev = 0
        for r in rocks:
            if r - prev < mid:
                removed += 1
                if removed > n:
                    break
            else:
                prev = r

        if removed > n:
            right = mid - 1
        else:
            answer = mid
            left = mid + 1

    return answer