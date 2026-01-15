try:
    text = input('Введите что-нибудь --> ')
except EOFError:
    print('Ну зачем вы мне сделали EOF?')
except KeyboardInterrupt:
    print('Вы отвменили операцию.')
else:
    print('Вы ввели {0}'.format(text))
