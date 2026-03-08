from collections import deque

def solution(maps):
    n = len(maps)
    m = len(maps[0])
    
    q = deque([(0, 0)])
    dist = [[0] * m for _ in range(n)]
    dist[0][0] = 1
    
    dx = [1, -1, 0, 0]
    dy = [0, 0, 1, -1]
    
    while q:
        x, y = q.popleft()
        
        if x == n - 1 and y == m - 1:
            return dist[x][y]
        
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            
            if 0 <= nx < n and 0 <= ny < m:
                if maps[nx][ny] == 1 and dist[nx][ny] == 0:
                    dist[nx][ny] = dist[x][y] + 1
                    q.append((nx, ny))
    
    return -1