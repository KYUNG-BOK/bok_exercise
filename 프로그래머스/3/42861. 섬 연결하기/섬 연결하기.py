def solution(n, costs):
    parent = list(range(n))
    rank = [0] * n

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra == rb:
            return False
        if rank[ra] < rank[rb]:
            ra, rb = rb, ra
        parent[rb] = ra
        if rank[ra] == rank[rb]:
            rank[ra] += 1
        return True

    costs.sort(key=lambda x: x[2])
    ans = 0
    cnt = 0
    for a, b, c in costs:
        if union(a, b):
            ans += c
            cnt += 1
            if cnt == n - 1:
                break
    return ans