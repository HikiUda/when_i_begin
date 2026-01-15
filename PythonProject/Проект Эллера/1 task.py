sum = 0

sequence = 0
sa = True

while sa:
    sequence += 1
    if sequence == 1000:
        sa = False
        print(sum)
    if sequence % 3 == 0:
        sum += sequence
        continue
    if sequence % 5 == 0:
        sum += sequence

#until_1000 = [n for n in range(1000) if (n % 3 == 0 or n % 5 == 0)]

#print(f"\nSum of all the natural numbers that are multiples of 3 and 5 under 1000 is {sum(until_1000)}.")