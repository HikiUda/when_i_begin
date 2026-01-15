class Person:
    def __init__(self, name):
        self.name = name

    def say_hi(self):
        print('Привет, меня зовут -', self.name)

p = Person('Dima')
p.say_hi()
