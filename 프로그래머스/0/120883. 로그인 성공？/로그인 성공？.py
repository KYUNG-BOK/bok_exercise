def solution(id_pw, db):
    for id, pw in db:
        if id == id_pw[0]:
            return "login" if pw == id_pw[1] else "wrong pw"
    return "fail"