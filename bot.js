import dotenv from 'dotenv';
dotenv.config();

import SlimBot from 'slimbot';

const slimBot = new SlimBot(process.env.TELEGRAM_BOT_API_TOKEN.toString());

slimBot.on('message', (message) => {
  slimBot.sendMessage(message.chat.id, 'Hey');
});

slimBot.startPolling();
