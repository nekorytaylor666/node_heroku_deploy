process.env.NTBA_FIX_319 = 1;

/**
 * This example demonstrates setting up a webook, and receiving
 * updates in your express app
 */
/* eslint-disable no-console */

const TOKEN = '745697317:AAH8xTTQEdYO7CSq5ArcQ-TnNVkdELGz1y8';
const url = 'https://heroku-test-toha.herokuapp.com:443';
const port = process.env.PORT || 3000;

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

// parse the updates to JSON
app.use(bodyParser.json());

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
	bot.processUpdate(req.body);
	res.sendStatus(200);
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});
// Start Express Server	
app.listen(port, () => {
	console.log(`Express server is listening on ${port}`);
});

// Just to ping!
bot.on('message', (msg) => {
	bot.sendMessage(msg.chat.id, 'I am alive!');
});

// const TelegramBot = require('node-telegram-bot-api');
// const ogs = require('open-graph-scraper');

// const options = {
//   webHook: {
//     // Port to which you should bind is assigned to $PORT variable
//     // See: https://devcenter.heroku.com/articles/dynos#local-environment-variables
//     port: process.env.PORT
//     // you do NOT need to set up certificates since Heroku provides
//     // the SSL certs already (https://<app-name>.herokuapp.com)
//     // Also no need to pass IP because on Heroku you need to bind to 0.0.0.0
//   }
// };
// // Heroku routes from port :443 to $PORT
// // Add URL of your app to env variable or enable Dyno Metadata
// // to get this automatically
// // See: https://devcenter.heroku.com/articles/dyno-metadata
// const url = process.env.APP_URL || 'https://heroku-test-toha.herokuapp.com:443';
// const bot = new TelegramBot(TOKEN, options);

// // This informs the Telegram servers of the new webhook.
// // Note: we do not need to pass in the cert, as it already provided
// bot.setWebHook(`${url}/bot${TOKEN}`);

// let siteUrl;

// bot.onText(/\/bookmark (.+)/, (msg, match) => {
// 	siteUrl = match[1];
// 	bot.sendMessage(msg.chat.id, 'Got it, in which category?', {
// 		reply_markup: {
// 			inline_keyboard: [
// 				[
// 					{
// 						text: 'Development',
// 						callback_data: 'development'
// 					},
// 					{
// 						text: 'Music',
// 						callback_data: 'music'
// 					},
// 					{
// 						text: 'Cute monkeys',
// 						callback_data: 'cute-monkeys'
// 					}
// 				]
// 			]
// 		}
// 	});
// });

// bot.on("callback_query", (callbackQuery) => {
//     const message = callbackQuery.message;
//     ogs({'url': siteUrl}, function (error, results) {
//       if(results.success) {
//         bot.sendMessage(message.chat.id,'Added \"' + results.data.ogTitle +'\" to category \"' + callbackQuery.data + '\"!')
//   } else {

//         bot.sendMessage(message.chat.id,'Added new website, but there was no OG data!');
//       }
//     });
// 	});

// bot.on('message',(msg)=>{
// 	bot.sendMessage(msg.chat.id, "Can't understand");
// })
