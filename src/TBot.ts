import TelegramBot, {
  Message,
  MessageType,
  Metadata,
  SendMessageOptions,
} from 'node-telegram-bot-api';

/**
 * Simple Telegram bot api wrapper
 */
export default class TBot {
  private bot: TelegramBot;
  private commands: Command[];

  /**
   * Constructor for the TelegramBot
   *
   * @param token Auth Token from Telegram
   */
  constructor(token: string) {
    this.bot = new TelegramBot(token, { polling: true });
    this.commands = [];

    this.addEventListeners();
  }

  private addEventListeners() {
    this.bot.on('message', (message: Message, metadata: Metadata) =>
      this.onMessage(message, metadata)
    );
  }

  private onMessage(message: Message, metadata: Metadata) {
    this.commands.forEach(({ name, callback }) => {
      let text = message.text;
      if (text && new RegExp(`^\/${name}(\ |$)`).test(text)) {
        const params = text.replace(new RegExp(`^\/${name}\(\ |$)`), '');
        let parsedParams = params.split(/\s+/);
        if (parsedParams[0] === '') parsedParams = [];
        callback(new Context(this.bot, message, metadata), ...parsedParams);
      }
    });
  }

  public addCommand(
    command: string,
    callback: (context: Context, ...params: string[]) => void
  ) {
    this.commands.push({ name: command, callback });
  }
}

export type Command = {
  /**
   * Name of the command
   */
  name: string;
  /**
   * Callback function for the command
   */
  callback: (context: Context, ...params: string[]) => void;
};

export class Context {
  private bot: TelegramBot;
  message: Message;
  type?: MessageType;

  constructor(bot: TelegramBot, message: Message, metadata: Metadata) {
    this.bot = bot;
    this.message = message;
    this.type = metadata.type;
  }

  /**
   *
   * @param content Content of the message
   * @param options Options
   * @returns
   */
  reply(content: string, options?: SendMessageOptions | undefined) {
    return this.bot.sendMessage(this.message.chat.id, content, options);
  }
}
