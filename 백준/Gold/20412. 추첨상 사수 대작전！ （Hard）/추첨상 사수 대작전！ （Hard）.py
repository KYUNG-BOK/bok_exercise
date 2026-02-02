# 파이썬 입문한지 1주일째,, 도전!!
import sys

m, seed, x1, x2 = map(int, sys.stdin.readline().split())

mB = m

def mod(x):
    return x % mB

d1 = mod(x2 - x1)
d2 = mod(x1 - seed)

if d2 == 0:
    a = 0
    c = x1 % mB
else:
    inv = pow(d2, mB - 2, mB)
    a = (d1 * inv) % mB
    c = (x1 - a * seed) % mB

print(a, c)