string = 'Привет, #Андрей#.'
new_string = ''
old = input('Old: ')
new = input('New: ')
for i in string:
    if i == old:
        new_string += new
    else:
        new_string += i

print(new_string)