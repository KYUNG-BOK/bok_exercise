from collections import deque

def solution(grid):
    n = len(grid)
    m = len(grid[0])

    snowballs = []
    for y in range(n):
        for x, ch in enumerate(grid[y]):
            if ch == 'o':
                snowballs.append((x, y))

    visited = [[bytearray(m) for _ in range(n)] for _ in range(2)]
    three_way = [[0, 0, -1], [0, 0, -1]]

    shared_blocks = 0
    a_only_blocks = 0
    b_only_blocks = 0
    snowball_distance = n * m + 1
    is_case2 = False

    dx = (1, 0, -1, 0)
    dy = (0, 1, 0, -1)

    for s, (sx, sy) in enumerate(snowballs):
        q = deque([(sx, sy, 0)])
        visited[s][sy][sx] = 1

        while q:
            x, y, dist = q.popleft()
            choices = 0

            for k in range(4):
                nx = x + dx[k]
                ny = y + dy[k]

                if nx < 0 or nx >= m or ny < 0 or ny >= n:
                    continue
                if grid[ny][nx] == '#':
                    continue

                choices += 1

                if visited[s][ny][nx]:
                    continue

                if grid[ny][nx] == 'o':
                    snowball_distance = min(snowball_distance, dist + 1)
                    continue

                visited[s][ny][nx] = 1
                q.append((nx, ny, dist + 1))

            if choices >= 3:
                if s == 1 and visited[0][y][x] and grid[y][x] == '.':
                    is_case2 = True

                if three_way[s][2] == -1:
                    three_way[s] = [x, y, dist]

    for y in range(n):
        v0 = visited[0][y]
        v1 = visited[1][y]
        for x, ch in enumerate(grid[y]):
            if ch == 'o':
                continue
            if v0[x] and v1[x]:
                shared_blocks += 1
            elif v0[x]:
                a_only_blocks += 1
            elif v1[x]:
                b_only_blocks += 1

    def calculate(case_type, distance, shared, a_only, b_only, dist_to_three_way):
        total = shared + a_only + b_only
        result = 0
        cur_shared = shared

        for extra_sum in range(distance - 1, total + 1):
            if case_type == 3 and extra_sum > cur_shared + a_only + dist_to_three_way + 1:
                cur_shared += 1

            if case_type == 2:
                result += extra_sum // 2 + 1
            else:
                result += min(extra_sum // 2 + 1, a_only + cur_shared + 1)

            if case_type == 1 and extra_sum > b_only + cur_shared:
                result -= extra_sum - b_only - cur_shared

        return result

    if three_way[0][2] == -1 and three_way[1][2] == -1:
        return calculate(
            1,
            snowball_distance,
            shared_blocks,
            min(a_only_blocks, b_only_blocks),
            max(a_only_blocks, b_only_blocks),
            250001
        )

    if (three_way[0][2] != -1 and three_way[1][2] != -1) or is_case2:
        return calculate(
            2,
            snowball_distance,
            shared_blocks,
            a_only_blocks,
            b_only_blocks,
            0
        )

    if three_way[0][2] == -1:
        return calculate(
            3,
            snowball_distance,
            shared_blocks,
            a_only_blocks,
            b_only_blocks,
            three_way[1][2]
        )

    return calculate(
        3,
        snowball_distance,
        shared_blocks,
        b_only_blocks,
        a_only_blocks,
        three_way[0][2]
    )