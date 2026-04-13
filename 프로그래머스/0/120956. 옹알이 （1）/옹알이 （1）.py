def solution(babbling):
    words = ["aya", "ye", "woo", "ma"]
    count = 0

    for b in babbling:
        for word in words:
            b = b.replace(word, " ")
        if b.strip() == "":
            count += 1

    return count