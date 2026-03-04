def solution(myString):
    return ''.join('A' if c in 'aA' else c.lower() for c in myString)