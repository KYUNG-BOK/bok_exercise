def solution(myString):
    return ''.join('l' if c < 'l' else c for c in myString)