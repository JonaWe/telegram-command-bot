import TBot from './bot.js';

import dotenv from 'dotenv';
dotenv.config();

const bot = new TBot(process.env.TELEGRAM_BOT_API_TOKEN);

bot.addCommand('test', (ctx, ...args) => {
  const val = args.reduce((res, cur) => res + cur + ' ', '') || 'No Args';
  ctx.sendMessage(val);
  // bot.slimbot.sendMessage(message.chat.id, val);
});
bot.addCommand('hey', () => console.log('hey'));
bot.run();
