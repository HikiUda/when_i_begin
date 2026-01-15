import tkinter as tk
from tkinter import messagebox

win = tk.Tk()
win.title('Калькулятор')
win.geometry('240x330+100+100')
win['bg'] = '#C0F3FF'


def make_click(number):
    return tk.Button(text=number, bd=5, font=('Arial', 15), command=lambda: add_digit(number))


def make_operation(operate):
    return tk.Button(text=operate, bd=5, fg='red', font=('Arial', 15), command=lambda: add_operation(operate))


def make_calc(operate):
    return tk.Button(text=operate, bd=5, fg='green', font=('Arial', 15), command=lambda: add_calculation())


def make_clear(operate):
    return tk.Button(text=operate, bd=5, fg='red', font=('Arial', 15), command=lambda: clear())

def add_digit(digit):
    value = calc.get()
    if value[0] == '0' and len(value) == 1:
        value = value[1:]
    calc.delete(0, tk.END)
    calc.insert(0, value + digit)


def add_operation(operate):
    value = calc.get()
    if value[-1] in '+-*/':
        value = value[:-1]
    elif '+' in value or '-' in value or '*' in value or '/' in value:
        add_calculation()
        value = calc.get()
    calc.delete(0, tk.END)
    calc.insert(0, value + operate)


def add_calculation():
    value = calc.get()
    if value[-1] in '+-*/':
        value = value + value[:-1]
    calc.delete(0, tk.END)
    try:
        calc.insert(0, eval(value))
    except(NameError, SyntaxError):
        messagebox.showinfo('Error', 'Нельзя использовать буквы и специальные символы!')
        calc.insert(0, '0')
    except ZeroDivisionError:
        messagebox.showinfo('Error', 'На ноль делить нельзя!')
        calc.insert(0, '0')


def clear():
    calc.delete(0, tk.END)
    calc.insert(0, '0')

def pass_key(event):
    if event.char.isdigit():
        add_digit(event.char)
    elif event.char in '+-*/':
        add_operation(event.char)
    elif event.char == '\r':
        add_calculation()
    elif event.char == '\x08':
        clear()


calc = tk.Entry(win, justify=tk.RIGHT, font=('Arial', 15), width=15)
calc.insert(0, '0')
calc.grid(row=0, column=0, columnspan=4, stick='we', padx=10)

win.bind('<Key>', pass_key)

make_click('1').grid(row=3, column=0, stick='wens', padx=10, pady=10)
make_click('2').grid(row=3, column=1, stick='wens', padx=10, pady=10)
make_click('3').grid(row=3, column=2, stick='wens', padx=10, pady=10)
make_click('4').grid(row=2, column=0, stick='wens', padx=10, pady=10)
make_click('5').grid(row=2, column=1, stick='wens', padx=10, pady=10)
make_click('6').grid(row=2, column=2, stick='wens', padx=10, pady=10)
make_click('7').grid(row=1, column=0, stick='wens', padx=10, pady=10)
make_click('8').grid(row=1, column=1, stick='wens', padx=10, pady=10)
make_click('9').grid(row=1, column=2, stick='wens', padx=10, pady=10)
make_click('0').grid(row=4, column=1, stick='wens', padx=10, pady=10)

make_operation('+').grid(row=1, column=3, stick='wens', padx=10, pady=10)
make_operation('-').grid(row=2, column=3, stick='wens', padx=10, pady=10)
make_operation('*').grid(row=3, column=3, stick='wens', padx=10, pady=10)
make_operation('/').grid(row=4, column=3, stick='wens', padx=10, pady=10)

make_calc('=').grid(row=4, column=2, stick='wens', padx=10, pady=10)
make_clear('c').grid(row=4, column=0, stick='wens', padx=10, pady=10)

win.grid_columnconfigure(0, minsize=60)
win.grid_columnconfigure(1, minsize=60)
win.grid_columnconfigure(2, minsize=60)
win.grid_columnconfigure(3, minsize=60)

win.grid_rowconfigure(1, minsize=60)
win.grid_rowconfigure(2, minsize=60)
win.grid_rowconfigure(3, minsize=60)
win.grid_rowconfigure(4, minsize=60)

win.mainloop()
