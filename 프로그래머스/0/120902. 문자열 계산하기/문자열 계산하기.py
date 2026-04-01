def solution(my_string):
    tokens = my_string.split()
    result = int(tokens[0])
    for i in range(1, len(tokens), 2):
        if tokens[i] == '+':
            result += int(tokens[i+1])
        else:
            result -= int(tokens[i+1])
    return result