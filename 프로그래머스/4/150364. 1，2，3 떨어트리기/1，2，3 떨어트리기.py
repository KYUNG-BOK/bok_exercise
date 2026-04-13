def solution(edges, target):
    n = len(target)
    children = [[] for _ in range(n + 1)]

    for parent, child in edges:
        children[parent].append(child)

    for i in range(1, n + 1):
        children[i].sort()

    leaves = [i for i in range(1, n + 1) if not children[i]]
    pointer = [0] * (n + 1)

    def drop():
        node = 1
        while children[node]:
            idx = pointer[node]
            next_node = children[node][idx]
            pointer[node] = (idx + 1) % len(children[node])
            node = next_node
        return node

    need = [0] * (n + 1)
    for leaf in leaves:
        need[leaf] = (target[leaf - 1] + 2) // 3

    count = [0] * (n + 1)
    order = []

    while True:
        leaf = drop()
        count[leaf] += 1
        order.append(leaf)

        if count[leaf] > target[leaf - 1]:
            return [-1]

        done = True
        for node in leaves:
            if count[node] < need[node]:
                done = False
                break

        if done:
            break

    remain_sum = [0] + target[:]
    remain_cnt = count[:]
    answer = []

    for leaf in order:
        remain_cnt[leaf] -= 1

        placed = False
        for num in (1, 2, 3):
            rest = remain_sum[leaf] - num
            if remain_cnt[leaf] <= rest <= remain_cnt[leaf] * 3:
                answer.append(num)
                remain_sum[leaf] = rest
                placed = True
                break

        if not placed:
            return [-1]

    return answer