import { createConversation } from '@grammyjs/conversations'
import { Bot } from './bot.js'

export class Scene {
    static create (scene, target) {
        Bot.cmd(target)
        Bot.reg(createConversation(scene, target))
    }
}