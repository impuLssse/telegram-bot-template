import PrettyError from 'pretty-error'
import ora from 'ora'
import c from 'colors'

const { blue, green, red, white, yellow, bold } = c
const s = '\n'
const tag = prefix => bold(`[${prefix}] `)
const build = (color, prefix, text) => color(tag(prefix) + text)

function text (prefix, action, success, fail) {
    return {
        success: build(green, prefix, success),
        action: build(blue, prefix, action),
        fail: build(red, prefix, fail),
    }
}

function textWithOneWord (prefix, word) {
    return {
        success: build(green, prefix, word + 'ed'),
        action: build(blue, prefix, word + 'ing'),
        fail: build(red, prefix, word + ' failed'),
    }
}


class Log {
    constructor (msg) {
        console.log(blue(msg))
    }
     
    static err (e) {
        console.log(new PrettyError().render(new Error(e)))
        throw new Error(e)
    }
    
    static loading (cb, prefix, word, action, success, fail) {
        const status = text(prefix, action, success, fail)
        const statusWithOneWord = textWithOneWord(prefix, word)

        const spinner = ora({
            text: !word ? status.action : statusWithOneWord.action,
            indent: 5,
            spinner: 'fistBump', // 'fistBump', 'clock', 'aesthetic'
            color: 'blue',
        }).start()

        if (typeof cb === "function" && cb()) {
            spinner.succeed(!word ? status.success : statusWithOneWord.success)
        } else {
            const failed = !word ? status.fail : statusWithOneWord.fail
            spinner.fail(failed)
            Log.err(failed)
        }
        
    }
}

export { Log }