def solution(my_string, queries):
    s = my_string
    
    for start, end in queries:
        s = s[:start] + s[start:end+1][::-1] + s[end+1:]
    
    return s