import { createConversation } from '@grammyjs/conversations'
import { Bot } from './bot.js'

export class Scene {
    static create (target, scene, menu) {
        Bot.cmd(target)
        Bot.reg(createConversation(scene, target))

        if (menu) Bot.reg(menu)

        return this
    }
}