
// core functions
import { Log, runner } from './core/index.js'

const bot = runner.bot


Log.loading(runner.app, 'BOT', 'start')
Log.loading(runner.modules, 'MODULES', 'import')

export default bot