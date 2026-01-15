'''Massiv = [1, 2, 3, 4, 5]
Summa = 0


def DSumma(x):
    global Summa
    if x == len(Massiv):
        return
    Summa += Massiv[x]
    DSumma(x + 1)


DSumma(0)
print('\nSumma = ', Summa)'''

'''list1 = [1, 2, 4, 5, 9]
q = 0

def quantity(x):
    global q
    if x == len(list1):
        return 
    q += 1
    quantity(x + 1)

quantity(0)
print(q)'''

def find_max_recursively(S, n):
    """Find the maximum element in a sequence S, of n elements."""
    if n == 1:  # reached the left most item
        return S[n-1]
    else:
        previous = find_max_recursively(S, n-1)
        current = S[n-1]
        if previous > current:
            return previous
        else:
            return current


if __name__ == '__main__':
    print(find_max_recursively([5, 10, 20, 11, 3], 5))

