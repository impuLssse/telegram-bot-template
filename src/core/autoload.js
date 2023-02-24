import glob from 'glob'
import { Log } from './log.js'


export function Autoload (path) {
    try {
        return glob.sync(path, {
            ignore: '**/index.js'
        })
            .map(file => file.replace('src', '../'))
    } catch (e) {
        Log.err(e)
    }
}
