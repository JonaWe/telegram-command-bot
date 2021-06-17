import SlimBot from 'slimbot';

export default class TBot {
  constructor(...args) {
    this.slimbot = new SlimBot(...args);
    this.commands = [];
    this.setup();
  }

  setup() {
    this.slimbot.on('message', (message) => this.onMessage(message));
  }

  onMessage(message) {
    this.commands.forEach(({ name, callback }) => {
      if (new RegExp(`^\/${name}(\ |$)`).test(message.text)) {
        const params = message.text.replace(
          new RegExp(`^\/${name}\(\ |$)`),
          ''
        );
        let parsedParams = params.split(/\s+/);
        if (parsedParams[0] === '') parsedParams = [];
        callback(new ChatContext(message, this.slimbot), ...parsedParams);
      }
    });
  }

  addCommand(name, callback) {
    this.commands.push({ name, callback });
  }

  run() {
    this.slimbot.startPolling();
  }
}

class ChatContext {
  constructor(message, slimbot) {
    this.message = message;
    this.slimbot = slimbot;
  }

  sendMessage(content) {
    this.slimbot.sendMessage(this.message.chat.id, content);
  }
}
