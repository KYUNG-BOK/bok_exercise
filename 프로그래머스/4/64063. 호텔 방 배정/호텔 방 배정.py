def solution(k, room_number):
    parent = {}
    answer = []

    def find(x):
        path = []

        while x in parent:
            path.append(x)
            x = parent[x]

        empty_room = x
        parent[empty_room] = empty_room + 1

        for p in path:
            parent[p] = empty_room + 1

        return empty_room

    for room in room_number:
        answer.append(find(room))

    return answer