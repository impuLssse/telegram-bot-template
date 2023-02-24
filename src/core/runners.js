import dotenv from 'dotenv'; dotenv.config()
import { Bot as BaseBot, session } from 'grammy'
import { conversations } from '@grammyjs/conversations'
import { apiThrottler } from '@grammyjs/transformer-throttler'
import { Autoload } from './autoload.js'
import { run } from '@grammyjs/runner'
import { Log } from './log.js'
import { Bot } from './bot.js'

const bot = new BaseBot(process.env.TOKEN)
Bot.init(bot)


function app () {
    try {
        bot.catch(e => Log.err(e))
        bot.api.config.use(apiThrottler())
    
        Bot
            .reg(session({ initial: () => ({
                messages: 1,
                edits: 0,
                counter: 0,
            })}))
            .reg(conversations())
        
        return run(bot).isRunning()
    } catch (e) {
        Log.err(e)
    }
}

function modules () {
    try {
        const convers = Autoload('**/modules/**/**.js')
        convers.forEach(async file => await import(file))

        return true
    } catch (e) {
        Log.err(e)
    }
}

export const runner = { bot, app, modules }