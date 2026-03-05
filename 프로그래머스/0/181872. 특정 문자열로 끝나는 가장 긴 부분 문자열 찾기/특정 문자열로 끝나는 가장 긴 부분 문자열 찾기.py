def solution(myString, pat):
    i = myString.rfind(pat)
    return myString[:i+len(pat)]