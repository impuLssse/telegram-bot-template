import PrettyError from 'pretty-error'
import c from 'colors'

class Log {
    constructor (msg) {
        console.log(c.blue(msg))
    }

    static err (e) {
        console.log(new PrettyError().render(new Error(e)))
        throw new Error(e)
    }
}

export { Log }