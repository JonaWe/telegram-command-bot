import TBot from './TBot'

import dotenv from 'dotenv'
dotenv.config()


const bot = new TBot(process.env.TELEGRAM_BOT_API_TOKEN as string);