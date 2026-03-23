def solution(rsp):
    d = {'2':'0', '0':'5', '5':'2'}
    return ''.join(d[i] for i in rsp)