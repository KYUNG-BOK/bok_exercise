def solution(numLog):
    diff_map = {
        1: "w",
        -1: "s",
        10: "d",
        -10: "a"
    }
    
    result = []
    
    for i in range(1, len(numLog)):
        diff = numLog[i] - numLog[i - 1]
        result.append(diff_map[diff])
    
    return "".join(result)