name = 'Swaroop'

if name.startswith('Swa'):
    print('Swa')

if 'a' in name:
    print('a')

if name.find('war') != -1:
    print('war')

delimiter = '_*_'
shoplict = ['яблоки', 'бананы', 'чай', 'печеньки']
print(delimiter.join(shoplict))