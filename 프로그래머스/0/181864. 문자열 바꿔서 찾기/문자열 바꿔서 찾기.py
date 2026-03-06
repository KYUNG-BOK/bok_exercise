def solution(myString, pat):
    swapped = ''.join('B' if c == 'A' else 'A' for c in myString)
    return 1 if pat in swapped else 0