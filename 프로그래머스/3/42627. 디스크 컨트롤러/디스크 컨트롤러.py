import heapq

def solution(jobs):
    n = len(jobs)

    jobs = sorted([(s, l, i) for i, (s, l) in enumerate(jobs)])
    idx = 0
    t = 0
    total = 0

    pq = []

    while idx < n or pq:
        while idx < n and jobs[idx][0] <= t:
            s, l, i = jobs[idx]
            heapq.heappush(pq, (l, s, i))
            idx += 1

        if pq:
            l, s, i = heapq.heappop(pq)
            t += l
            total += (t - s)
        else:
            t = jobs[idx][0]

    return total // n