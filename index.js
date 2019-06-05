const TelegramBot = require('node-telegram-bot-api');
const ogs = require('open-graph-scraper');
const TOKEN = '745697317:AAH8xTTQEdYO7CSq5ArcQ-TnNVkdELGz1y8';

const options = {
  webHook: {
    // Port to which you should bind is assigned to $PORT variable
    // See: https://devcenter.heroku.com/articles/dynos#local-environment-variables
    port: process.env.PORT
    // you do NOT need to set up certificates since Heroku provides
    // the SSL certs already (https://<app-name>.herokuapp.com)
    // Also no need to pass IP because on Heroku you need to bind to 0.0.0.0
  }
};
// Heroku routes from port :443 to $PORT
// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
const url = process.env.APP_URL || 'https://heroku-test-toha.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, options);


// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${TOKEN}`);


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