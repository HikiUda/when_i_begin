number = 28
run = True
while run :
    dak = int(input('Ввод : '))

    if dak == number :
        print('Удача')
        run = False
    elif dak < number :
        print('Выбери побольше.')
    else:
        print('Неудача.')
print('Все!')
