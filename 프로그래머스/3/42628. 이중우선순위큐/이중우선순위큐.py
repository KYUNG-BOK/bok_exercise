import heapq

def solution(operations):
    min_h = []
    max_h = []
    alive = [False] * (len(operations) + 1)
    uid = 0

    def clean_min():
        while min_h and not alive[min_h[0][1]]:
            heapq.heappop(min_h)

    def clean_max():
        while max_h and not alive[max_h[0][1]]:
            heapq.heappop(max_h)

    for op in operations:
        cmd, num = op.split()

        if cmd == "I":
            x = int(num)
            heapq.heappush(min_h, (x, uid))
            heapq.heappush(max_h, (-x, uid))
            alive[uid] = True
            uid += 1

        else:
            if num == "1":
                clean_max()
                if max_h:
                    _, i = heapq.heappop(max_h)
                    alive[i] = False
            else:
                clean_min()
                if min_h:
                    _, i = heapq.heappop(min_h)
                    alive[i] = False

    clean_min()
    clean_max()

    if not min_h or not max_h:
        return [0, 0]

    return [-max_h[0][0], min_h[0][0]]