from collections import deque, Counter

def solution(game_board, table):
    n = len(game_board)
    dirs = [(1,0), (-1,0), (0,1), (0,-1)]

    def bfs(grid, sx, sy, target, visited):
        q = deque([(sx, sy)])
        visited[sx][sy] = True
        cells = [(sx, sy)]
        while q:
            x, y = q.popleft()
            for dx, dy in dirs:
                nx, ny = x + dx, y + dy
                if 0 <= nx < n and 0 <= ny < n and not visited[nx][ny] and grid[nx][ny] == target:
                    visited[nx][ny] = True
                    q.append((nx, ny))
                    cells.append((nx, ny))
        return cells

    def normalize(cells):
        xs = [x for x, _ in cells]
        ys = [y for _, y in cells]
        minx, miny = min(xs), min(ys)
        norm = sorted((x - minx, y - miny) for x, y in cells)
        return tuple(norm)

    def rotate90(cells):
        rotated = [(y, -x) for x, y in cells]
        return rotated

    def signature(cells):
        cur = cells[:]
        best = None
        for _ in range(4):
            cand = normalize(cur)
            if best is None or cand < best:
                best = cand
            cur = rotate90(cur)
        return best

    def get_components(grid, target):
        visited = [[False] * n for _ in range(n)]
        comps = []
        for i in range(n):
            for j in range(n):
                if not visited[i][j] and grid[i][j] == target:
                    comps.append(bfs(grid, i, j, target, visited))
        return comps

    holes = get_components(game_board, 0)
    blocks = get_components(table, 1)

    block_count = Counter()
    block_size = {}
    for b in blocks:
        sig = signature(b)
        block_count[sig] += 1
        block_size[sig] = len(sig)

    filled = 0
    for h in holes:
        sig = signature(h)
        if block_count[sig] > 0:
            block_count[sig] -= 1
            filled += len(sig)

    return filled