x = 3
y = 5

def printMax(a, b):
    if a > b:
        print(a, 'Максимально.')
    elif a == b:
        print(a, 'равно', b)
    else:
        print(b, 'максимально.')

printMax(8, 2)

printMax(x, y)

printMax(2, 2)
