import TelegramBot, { Message, Metadata } from 'node-telegram-bot-api';

export default class TBot {
	bot: TelegramBot;
	constructor(token: string) {
		this.bot = new TelegramBot(token, {polling: true})
		this.bot.on('message', (message: Message, metadata: Metadata) => console.log("Jona", message, metadata));
	}

}