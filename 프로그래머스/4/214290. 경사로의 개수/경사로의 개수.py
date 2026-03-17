MOD = 1_000_000_007

def mat_mul(A, B):
    n = len(A)
    C = [[0] * n for _ in range(n)]
    for i in range(n):
        Ai = A[i]
        Ci = C[i]
        for k in range(n):
            if Ai[k] == 0:
                continue
            a = Ai[k]
            Bk = B[k]
            for j in range(n):
                if Bk[j]:
                    Ci[j] = (Ci[j] + a * Bk[j]) % MOD
    return C

def mat_pow(A, e):
    n = len(A)
    R = [[0] * n for _ in range(n)]
    for i in range(n):
        R[i][i] = 1
    while e:
        if e & 1:
            R = mat_mul(R, A)
        A = mat_mul(A, A)
        e >>= 1
    return R

def solution(grid, d, k):
    n = len(grid)
    m = len(grid[0])
    s = n * m
    
    idx = [[i * m + j for j in range(m)] for i in range(n)]
    mats = []
    
    for diff in d:
        A = [[0] * s for _ in range(s)]
        for i in range(n):
            for j in range(m):
                u = idx[i][j]
                h = grid[i][j]
                if i > 0 and grid[i - 1][j] - h == diff:
                    A[u][idx[i - 1][j]] = 1
                if i + 1 < n and grid[i + 1][j] - h == diff:
                    A[u][idx[i + 1][j]] = 1
                if j > 0 and grid[i][j - 1] - h == diff:
                    A[u][idx[i][j - 1]] = 1
                if j + 1 < m and grid[i][j + 1] - h == diff:
                    A[u][idx[i][j + 1]] = 1
        mats.append(A)
    
    T = [[0] * s for _ in range(s)]
    for i in range(s):
        T[i][i] = 1
    
    for A in mats:
        T = mat_mul(T, A)
    
    P = mat_pow(T, k)
    
    ans = 0
    for i in range(s):
        ans = (ans + sum(P[i])) % MOD
    return ans