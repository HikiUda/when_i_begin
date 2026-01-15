# Алгоритм Евклида - нахождение НОД

def gcd(a, b):
    while a != 0 and b != 0:
        if a > b:
            a = a % b
        else:
            b = b % a

    return a + b

a = int(input('Ввод а: '))
b = int(input('Ввод b: '))

print('НОД чисел a и b = ', gcd(a, b))

