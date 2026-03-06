def solution(heights):
    heights.sort()
    n = len(heights)
    m = n // 2

    diffs = [heights[i + m] - heights[i] for i in range(m)]

    if n % 2 == 0:
        return min(diffs)

    diffs.append(heights[-1] - heights[m])
    diffs.sort()
    return diffs[1]