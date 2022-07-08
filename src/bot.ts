import TelegramBot from "node-telegram-bot-api";

export class Bot {
    private mTelegramBot: TelegramBot;

    constructor(token: string) {
        this.mTelegramBot = new TelegramBot(token, {
            polling: false
        });
    }

    public async sendMessage(chatId: string, message: string): Promise<boolean> {
        let succeed = false;
        //
        try {
            const msg = await this.mTelegramBot.sendMessage(chatId, message, {
                disable_notification: true
            });
            succeed = true;
        }
        catch (err) {
            console.error(`Failed to send message on chat '${chatId}': ${err}`);
        }
        return succeed;
    }

    public async getChatAdministrator(chatId: string): Promise<Array<TelegramBot.ChatMember>> {
        let adminList: Array<TelegramBot.ChatMember> = [];
        //
        try {
            adminList = await this.mTelegramBot.getChatAdministrators(chatId);
        }
        catch (err) {
            console.error(`Failed to to getChatAdministrator: ${err}`);
        }
        //
        return adminList;
    }
}