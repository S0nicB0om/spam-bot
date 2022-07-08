import { config } from 'dotenv';
import { Bot } from './bot';

config({
    override: true
});

let TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
    console.error("Please assign your bot token with the key 'BOT_TOKEN' in your .env file");
    process.exit(9);
}
let CHAT_ID = process.env.BOT_CHAT_ID;
if (!CHAT_ID) {
    console.error("Please assign your chat id with the key 'BOT_CHAT_ID' in your .env file");
    process.exit(9);
}

const start = async (token: string, chatId: string) => {
    const bot = new Bot(token);

    const adminList = await bot.getChatAdministrator(chatId);
    console.log('+----------------- Admin list -----------------+');
    for (let admin of adminList) {
        console.log(`${admin.user.first_name} (is bot: ${admin.user.is_bot})`);
    }
    console.log('+----------------------------------------------+');

    setInterval(() => {
        bot.sendMessage(chatId, "Hello there, I'm just here to spam :)");
    }, 5000);
}

start(TOKEN, CHAT_ID);

