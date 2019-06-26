import {readFile, writeFileSync as wfs} from 'fs'
import {promisify} from 'util'
import {resolve as r} from 'path'
promisify(readFile)(r(__dirname, '../package.json'))
    .then(data => {
        data = JSON.parse(data)
        wfs(r(__dirname, './name.js'), String(data.name), 'utf8')
    })

const init = async function() {
    try {
        let data = await promisify(readFile)(r(__dirname, '../package.json'))
        data = JSON.parse(data)
        console.log(data.name)
    } catch (error) {
        console.log(error)
    }
}
init()