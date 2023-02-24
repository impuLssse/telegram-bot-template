import { Composer, session } from 'grammy'
import { apiThrottler } from '@grammyjs/transformer-throttler'
import { conversations, createConversation } from '@grammyjs/conversations'

// bot.api.setMyCommands([
//     { command: "start", description: "запуск" },
//     { command: "stats", description: "статистика" },
//     { command: "help", description: "нужна помощь с товаром?" },
// ])

class Bot {
    static init (bot) {
        this.bot = bot
        this.mdw = new Composer()
        this.bot.use(this.mdw)

        return this
    }

    static reg (middlewareFn) {
        this.mdw.use(middlewareFn); return this
    }

    static setMyCommands ([{ cmd, desc }]) {
        this.bot.api.setMyCommands([{ cmd, desc }]); return this
    }

    static cmd (target) {
        this.bot.command(target, async ctx => await ctx.conversation.enter(target))
        return this
    }
}

export { Bot }