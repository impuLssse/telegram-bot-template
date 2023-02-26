import dotenv from 'dotenv'; dotenv.config()
import glob from 'glob'
import { Bot as BaseBot, session } from 'grammy'
import { conversations } from '@grammyjs/conversations'
import { parseMode, hydrateReply } from '@grammyjs/parse-mode'
import { apiThrottler } from '@grammyjs/transformer-throttler'
import { run } from '@grammyjs/runner'
import { Log } from './log.js'
import { Bot } from './bot.js'

const bot = new BaseBot(process.env.TOKEN)
Bot.init(bot)


function Autoload (path) {
    try {
        return glob.sync(path, {
            ignore: '**/index.js'
        })
            .map(file => file.replace('src', '../'))
    } catch (e) {
        Log.err(e)
    }
}

function app () {
    try {
        bot.catch(e => Log.err(e))
        bot.api.config.use(apiThrottler())
        bot.api.config.use(parseMode('HTML'))

        bot.api.setMyCommands([
            { command: "start", description: "запуск" },
            { command: "reload", description: "перезапуск" },
        ])

    
        Bot
            .reg(session({ initial: () => ({
                messages: 1,
                edits: 0,
                counter: 0,
            })}))
            .reg(conversations())
            .reg(hydrateReply)
            .cmd('start')
        
        return run(bot).isRunning()
    } catch (e) {
        Log.err(e)
    }
}

function modules () {
    try {
        const convers = Autoload('*/modules/**/**.js')
        convers.forEach(async file => await import(file))

        return convers.length ? true : false
    } catch (e) {
        Log.err(e)
    }
}

function connect () {
    try {
        return true
    } catch (e) {
        Log.err(e)
    }
}

export const runner = { app, modules, connect }
export default bot