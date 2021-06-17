import TelegramBot, { Message, Metadata } from 'node-telegram-bot-api';

/**
 * Simple Telegram bot api wrapper
 */
export default class TBot {
	bot: TelegramBot;
	/**
	 * Constructor for the TelegramBot
	 * 
	 * @param token Auth Token from Telegram
	 */
	constructor(token: string) {
		this.bot = new TelegramBot(token, {polling: true})
		this.bot.on('message', (message: Message, metadata: Metadata) => console.log("Jona", message, metadata));
	}

}