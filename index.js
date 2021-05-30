const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const serve = require('koa-static')

const Router = require('@koa/router')
const { default: fetch } = require('node-fetch')

const app = new Koa()


app.use(serve("./public"))
app.use(
    bodyparser({
        // strict: true,
        onerror: (err, ctx) => {
            captureException(err, ctx)
            console.error(`bodyparser error`)
        },
    }),
)
const router = new Router()
router.get("/api/req",async(ctx,next)=>{
    
    const url = ctx.request.query.url

    ctx.body = await fetch(url).then(res=>res.json())
    ctx.status = 200
    await next()
})

app.use(router.routes())

app.listen("3001", "127.0.0.1", () => {
    console.log("started")
})