age = 17
name = "Dima"
i = 4

print("Возраст {} -- {} лет.".format(name, age))
print("Почему {} учит Python?".format(name))
print('{0:_^10}'.format(name))
print(i)
i = i + 1
print(i)
print(name)
i *= 2
print(i)

length = 3
breadth = 5

area = length * breadth
print('Площадь равна', area)
print('Периметр равен', 2 * (length + breadth))

number = 19
running = True

while running:
    guess = int(input('Введите целое число : '))
    if guess == number:
        print('Поздравлию вы угадали,')  # Начало нового блока
        print('(хотя и не выйграли никакого приза!)')
        running = False
    elif guess < number:
        print('Нет, загадоное число болише этого.')
    else:
        print('Нет, загадоное число меньше этого.')
else:
    print('Все!')
print('Конец.')
