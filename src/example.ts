import { TBot } from './TBot';

import dotenv from 'dotenv';
dotenv.config();

const bot = new TBot(process.env.TELEGRAM_BOT_API_TOKEN as string);

bot.addCommand('test', 'Test Command', async (c, ...params) => {
  console.log(c.author?.first_name);
  const message = await c.reply('Hey');
});

bot.addCommand('hey', 'This command greets you', (c) =>
  c.reply(`Hello ${c.chat.first_name}`)
);

bot.registerCommands();
