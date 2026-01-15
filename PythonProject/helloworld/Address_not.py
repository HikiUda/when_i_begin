import  json

with open('contact.txt', 'r') as f:
    content = f.read()
    contacts = json.loads(content)

def check2(number):
    if number.isdigit():
        return int(number)
    else:
        print('Можно вводить только целые числа!')
        return False

def check(contact):
    if contact in contacts:
        return True
    else:
        print('Такого контакта не существует.')
        return False

print("Просмотр-0, добавить-1, изменить-2, удалить-3, искать-4, выход-5")

while True:
    command = input('Введите номер операции: ')
    if command in ['0', '1', '2', '3', '4', '5']:
        command = int(command)
        if command == 0:
            print('Ваш список контактов:')
            for k, v in contacts.items():
                print(f'{k} : {v}')
        elif command == 1:
            contact = input('Имя: ')
            if contact != '':
                number = input('Номер: ')
                if check2(number):
                    contacts[contact] = number
                    print('Контакт добавлен.')
            else:
                print('"Имя" не должно быть пустым!')
        elif command == 2:
            contact = input('Имя: ')
            if check(contact):
                number = input('Номер: ')
                if check2(number):
                    contacts[contact] = number
                    print('Контакт изменен.')
        elif command == 3:
            contact = input('Имя: ')
            if check(contact):
                del contacts[contact]
                print('Контакт удален.')
        elif command == 4:
            contact = input('Имя: ')
            if check(contact):
                print(contact, ':', contacts[contact])
        elif command == 5:
            break
    else:
        print('Ошибка!')
        print("Просмотр-0, добавить-1, изменить-2, удалить-3, искать-4, выход-5")
        continue

with open('contact.txt', 'w') as f:
    content = json.dumps(contacts)
    f.write(content)

print('Программа завершена.')