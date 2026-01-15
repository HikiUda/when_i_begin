import telebot
import random

from telebot import types

TOKEN = '5484787143:AAHEaV09DiIvwUR9Su-NfC5r2tBDTc-gRmI'

bot = telebot.TeleBot(TOKEN)

@bot.message_handler(commands=['start'])
def welcome(message):
	bot.send_message(message.chat.id, "Hello")



bot.polling(none_stop=True)