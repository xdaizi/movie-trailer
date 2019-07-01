const Koa = require('koa')
const app = new Koa()
const { resolve } = require('path')
const server = require('koa-static')


app.use(server(resolve(__dirname, './')))

app.listen(4455)