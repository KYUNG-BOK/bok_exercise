def solution(board, k):
    s = 0
    for i in range(len(board)):
        for j in range(len(board[0])):
            if i + j <= k:
                s += board[i][j]
    return s