from collections import deque

def solution(begin, target, words):
    if target not in words:
        return 0
    
    def can_change(a, b):
        return sum(x != y for x, y in zip(a, b)) == 1
    
    q = deque([(begin, 0)])
    visited = set([begin])
    
    while q:
        word, cnt = q.popleft()
        
        if word == target:
            return cnt
        
        for nxt in words:
            if nxt not in visited and can_change(word, nxt):
                visited.add(nxt)
                q.append((nxt, cnt + 1))
    
    return 0