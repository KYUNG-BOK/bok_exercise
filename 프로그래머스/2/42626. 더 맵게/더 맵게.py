import heapq

def solution(scoville, K):
    heapq.heapify(scoville)
    cnt = 0

    while scoville and scoville[0] < K:
        if len(scoville) < 2:
            return -1

        a = heapq.heappop(scoville)
        b = heapq.heappop(scoville)
        new_scov = a + (b * 2)
        heapq.heappush(scoville, new_scov)
        cnt += 1

    return cnt