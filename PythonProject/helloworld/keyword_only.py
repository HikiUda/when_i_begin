def total(y=4, *x, z):
    count = y
    for number in x:
        count += number
    count += z
    print(count)

total(5, 3, 6, 9, z=99)

def ie(g=4, *, j):
    g += j
    print(g)
ie(2, j=9)
