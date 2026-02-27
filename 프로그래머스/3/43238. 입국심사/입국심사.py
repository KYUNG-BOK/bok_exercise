def solution(n, times):
    left, right = 1, min(times) * n
    answer = right

    while left <= right:
        mid = (left + right) // 2
        done = 0
        for t in times:
            done += mid // t
            if done >= n:
                break

        if done >= n:
            answer = mid
            right = mid - 1
        else:
            left = mid + 1

    return answer