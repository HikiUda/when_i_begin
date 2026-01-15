Fibonacci = [1, 2]

start = True
while start:
    if Fibonacci[-1] > 4000000:
        start = False
    Fibonacci.append(Fibonacci[-1] + Fibonacci[-2])

del Fibonacci[-1]
new = [u for u in Fibonacci if(u%2 == 0)]
print(sum(new))

"""n1, n2 = (0,1)
summ = 0

while n2 < 4000000:
    if not n2%2:
        summ += n2
    n1, n2 = n2, n1+n2

print(summ)"""