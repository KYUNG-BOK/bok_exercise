from collections import deque

def solution(rectangle, characterX, characterY, itemX, itemY):
    size = 102
    
    board = [[0] * size for _ in range(size)]
    
    for x1, y1, x2, y2 in rectangle:
        x1 *= 2
        y1 *= 2
        x2 *= 2
        y2 *= 2
        for y in range(y1, y2 + 1):
            for x in range(x1, x2 + 1):
                if x1 < x < x2 and y1 < y < y2:
                    board[y][x] = 2
                elif board[y][x] != 2:
                    board[y][x] = 1
    
    sx, sy = characterX * 2, characterY * 2
    tx, ty = itemX * 2, itemY * 2
    
    q = deque([(sx, sy, 0)])
    visited = [[False] * size for _ in range(size)]
    visited[sy][sx] = True
    
    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    
    while q:
        x, y, d = q.popleft()
        if x == tx and y == ty:
            return d // 2
        
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if 0 <= nx < size and 0 <= ny < size:
                if not visited[ny][nx] and board[ny][nx] == 1:
                    visited[ny][nx] = True
                    q.append((nx, ny, d + 1))