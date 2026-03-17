from math import gcd

def solution(n):
    return n // gcd(n, 6)