const { Telegraf } = require('telegraf');

const bot = new Telegraf('5957806698:AAESgG0kO1E2KHKt_LYhmjUEy-upISgEIx0');

bot.command('pomprice', require('./commands/pomprice.js'))
bot.command('checkwallet', require('./commands/checkwallet.js'))
bot.command('checktoken', require('./commands/checktoken.js'))
bot.command('checkcontract', require('./commands/checkcontract.js'))

bot.startPolling();
