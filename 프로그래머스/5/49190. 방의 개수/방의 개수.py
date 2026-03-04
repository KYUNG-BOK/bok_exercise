def solution(arrows):
    dx = [0, 1, 1, 1, 0, -1, -1, -1]
    dy = [1, 1, 0, -1, -1, -1, 0, 1]

    x = y = 0
    nodes = {(0, 0)}
    edges = set()
    rooms = 0

    for d in arrows:
        for _ in range(2):
            nx, ny = x + dx[d], y + dy[d]
            e = (x, y, nx, ny)

            if (nx, ny) in nodes and e not in edges:
                rooms += 1

            nodes.add((nx, ny))
            edges.add(e)
            edges.add((nx, ny, x, y))

            x, y = nx, ny

    return rooms