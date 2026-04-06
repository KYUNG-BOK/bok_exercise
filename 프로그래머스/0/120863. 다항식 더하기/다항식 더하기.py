def solution(polynomial):
    x_sum = 0
    num_sum = 0

    for term in polynomial.split(' + '):
        if 'x' in term:
            x_sum += int(term[:-1]) if term[:-1] else 1
        else:
            num_sum += int(term)

    if x_sum and num_sum:
        return f"{x_sum if x_sum > 1 else ''}x + {num_sum}"
    elif x_sum:
        return f"{x_sum if x_sum > 1 else ''}x"
    else:
        return str(num_sum)