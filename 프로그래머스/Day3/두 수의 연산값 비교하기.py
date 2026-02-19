def solution(a, b):
    ab = int(str(a) + str(b))
    mul = 2 * a * b
    return ab if ab >= mul else mul
