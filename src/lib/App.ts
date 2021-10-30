import express, { Router } from 'express'
import { setAuth } from './router/middlewares/setAuth'
import io from 'socket.io-client'
import { Env } from './Env'

export async function startExpress(
    router: Router,
    config: {
        port: number
        baseUrl: string
    }
) {
    const app = express()
    const mainRouter = Router()

    mainRouter.use(config.baseUrl, setAuth, router)

    app.use(express.json())
    app.use(mainRouter)

    await app.listen(config.port)
}

export async function createSocketClient() {
    return io('http://nginx/server', {
        auth: {
            token: Env.socketSecret,
        },
    })
}
