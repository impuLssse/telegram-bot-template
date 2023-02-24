import c from 'colors'

// core functions
import { Log, runner } from './core/index.js'

const bot = runner.bot

try {
    if (runner.app()) new Log('[BOT] started')
    if (runner.modules()) new Log('[MODULES] imported')
} catch (e) {
    Log.err(e)
}

export default bot