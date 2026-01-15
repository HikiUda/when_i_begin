x = 39

def func():
    global x

    print('x =', x)
    x = 2
    print('now x =', x)

func()
print('but x =', x)
