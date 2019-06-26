// 使用async函数
const fs = require('fs')
const util = require('util')
const readAsync = util.promisify(fs.readFile)
// async - await
const init = async function(path) {
    try {
        let data = await readAsync(path)
        data = JSON.parse(data)
        console.log(data.name)
    } catch (error) {
        console.log(error)
    }
}
init('./package.json')