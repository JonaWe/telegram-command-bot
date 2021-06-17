import TBot, { Context } from './TBot';

import dotenv from 'dotenv';
dotenv.config();

const bot = new TBot(process.env.TELEGRAM_BOT_API_TOKEN as string);

bot.addCommand('test', async (c: Context, ...params) => {
  console.log(params);
  const message = await c.reply('Hey');

  console.log(message);
});
