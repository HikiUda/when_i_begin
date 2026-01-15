num = 600851475143
count = 2

while 1:
    if num % count == 0:
        num /= count
        if num == 1:
            print(count)
            break
    if num % count != 0:
        count += 1