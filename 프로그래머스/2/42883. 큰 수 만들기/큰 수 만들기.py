def solution(number, k):
    stack = []
    for ch in number:
        while k and stack and stack[-1] < ch:
            stack.pop()
            k -= 1
        stack.append(ch)
    if k:
        stack = stack[:-k]
    return ''.join(stack)