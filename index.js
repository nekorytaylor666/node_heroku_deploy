const TelegramBot = require('node-telegram-bot-api');
const ogs = require('open-graph-scraper');
const token = '745697317:AAH8xTTQEdYO7CSq5ArcQ-TnNVkdELGz1y8';
const bot = new TelegramBot(token, { polling: true });

let siteUrl;

bot.onText(/\/bookmark (.+)/, (msg, match) => {
	siteUrl = match[1];
	bot.sendMessage(msg.chat.id, 'Got it, in which category?', {
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: 'Development',
						callback_data: 'development'
					},
					{
						text: 'Music',
						callback_data: 'music'
					},
					{
						text: 'Cute monkeys',
						callback_data: 'cute-monkeys'
					}
				]
			]
		}
	});
});


bot.on("callback_query", (callbackQuery) => {
    const message = callbackQuery.message;
    ogs({'url': siteUrl}, function (error, results) {
      if(results.success) {
        bot.sendMessage(message.chat.id,'Added \"' + results.data.ogTitle +'\" to category \"' + callbackQuery.data + '\"!')
  } else {
      
        bot.sendMessage(message.chat.id,'Added new website, but there was no OG data!');
      }
    });
  });