def solution(picture, k):
    answer = []
    for row in picture:
        expanded = ''.join(ch * k for ch in row)
        for _ in range(k):
            answer.append(expanded)
    return answer