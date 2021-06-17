import TelegramBot from 'node-telegram-bot-api';

export class TBot extends TelegramBot {
  private commands: BotActionCommand[];

  constructor(
    token: string,
    options: TelegramBot.ConstructorOptions | undefined = { polling: true }
  ) {
    super(token, options);
    this.commands = [];

    this.addEventListeners();
  }

  private addEventListeners() {
    super.on(
      'message',
      (message: TelegramBot.Message, metadata: TelegramBot.Metadata) =>
        this.onMessage(message, metadata)
    );
  }

  private onMessage(
    message: TelegramBot.Message,
    metadata: TelegramBot.Metadata
  ) {
    this.commands.forEach(({ command, callback }) => {
      let text = message.text;
      if (text && new RegExp(`^\/${command}(\ |$)`).test(text)) {
        const params = text.replace(new RegExp(`^\/${command}\(\ |$)`), '');
        let parsedParams = params.split(/\s+/);
        if (parsedParams[0] === '') parsedParams = [];
        callback(new Context(this, message, metadata), ...parsedParams);
      }
    });
  }

  public addCommand(
    command: string,
    description: string,
    callback: (context: Context, ...params: string[]) => void
  ) {
    this.commands.push({ command, callback, description });
  }

  public registerCommands() {
    return super.setMyCommands(this.commands);
  }
}

export interface BotActionCommand extends TelegramBot.BotCommand {
  callback: (context: Context, ...params: string[]) => void;
}

export class Context {
  private bot: TBot;
  message: TelegramBot.Message;
  chat: TelegramBot.Chat;
  author?: TelegramBot.User;
  type?: TelegramBot.MessageType;

  constructor(
    bot: TBot,
    message: TelegramBot.Message,
    metadata: TelegramBot.Metadata
  ) {
    this.bot = bot;
    this.message = message;
    this.chat = message.chat;
    this.type = metadata.type;
    this.author = message.from;
  }

  reply(content: string, options?: TelegramBot.SendMessageOptions | undefined) {
    return this.bot.sendMessage(this.message.chat.id, content, options);
  }
}
