import re

def solution(myStr):
    res = [s for s in re.split('[abc]', myStr) if s]
    return res if res else ["EMPTY"]