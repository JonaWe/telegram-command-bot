import dotenv from 'dotenv';
dotenv.config();

import SlimBot from 'slimbot';

class TBot {
  constructor(...args) {
    this.slimbot = new SlimBot(...args);
    this.commands = [];
  }

  updateCommands() {
    this.slimbot.on('message', (message) => {
      this.commands.forEach(({ name, callback }) => {
        if (new RegExp(`^\/${name}\ `).test(message.text)) {
          const params = message.text.replace(new RegExp(`^\/${name}\ `), '');
          const parsedParams = params.split(/\s+/);
          callback(...parsedParams);
        }
      });
    });
  }

  addCommand(name, callback) {
    this.commands.push({ name, callback });
    this.updateCommands();
  }

  run() {
    this.slimbot.startPolling();
  }
}

const bot = new TBot(process.env.TELEGRAM_BOT_API_TOKEN);
bot.addCommand('test', (name, age) => console.log(name, age));
bot.run();
