def solution(numbers):
    d = ["zero","one","two","three","four","five","six","seven","eight","nine"]
    for i, word in enumerate(d):
        numbers = numbers.replace(word, str(i))
    return int(numbers)