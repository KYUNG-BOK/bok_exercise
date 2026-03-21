def solution(age):
    return ''.join(chr(ord('a') + int(i)) for i in str(age))