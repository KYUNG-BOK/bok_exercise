class Fenwick:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def add(self, i, v):
        while i <= self.n:
            self.tree[i] += v
            i += i & -i

    def sum(self, i):
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & -i
        return s

def solution(s):
    n = len(s)
    total = n * (n - 1) * (n + 1) // 6

    runs = [[] for _ in range(26)]
    i = 0
    while i < n:
        j = i
        while j < n and s[j] == s[i]:
            j += 1
        runs[ord(s[i]) - 97].append(j - i)
        i = j

    same = 0
    cross = 0

    for arr in runs:
        if not arr:
            continue

        for m in arr:
            same += m * (m - 1) * (m + 1) // 6

        bit_cnt = Fenwick(n)
        bit_sum = Fenwick(n)
        total_cnt = 0

        for m in arr:
            for t in range(1, m + 1):
                cnt = bit_cnt.sum(t)
                sm = bit_sum.sum(t)
                cross += sm + t * (total_cnt - cnt)
            for v in range(1, m + 1):
                bit_cnt.add(v, 1)
                bit_sum.add(v, v)
                total_cnt += 1

    return total - same - cross