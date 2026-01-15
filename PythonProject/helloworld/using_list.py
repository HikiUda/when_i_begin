# Это мой список покупок
shoplict = ['яблоки', 'бананы', 'чай', 'печеньки']

print('Я должен сделать', len(shoplict), 'покупки.')

print('Покупки:', end=' ')
for item in shoplict:
    print(item, end=', ')

print('\nТакже нужно купить риса.')
shoplict.append('рис')
print('Теперь мой список покупок таков:', shoplict)

print('Отсартирую-ка я свой список.')
shoplict.sort()
print('Отсартированый список пакупок выглядит так:', shoplict)

print('Первое, что мне удалось купить это', shoplict[0])
olditem=shoplict[0]
del shoplict[0]
print('Я купил', olditem)
print('Теперт мой список пакупок:', shoplict)
