shoplict = ['яблоки', 'бананы', 'чай', 'печеньки']
mylist = shoplict

del shoplict[0]
print(shoplict)
print(mylist)

mylist = shoplict[:]
del mylist[0]

print(shoplict)
print(mylist)
