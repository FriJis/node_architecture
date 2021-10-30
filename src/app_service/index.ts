import { Env } from '../lib/Env'
import { startExpress } from '../lib/App'
import { AppAPIRouter } from './router'
import _init from '../lib/models'

_init()
startExpress(AppAPIRouter, { port: 3000, baseUrl: '/api/auth' }).then(() => {
    console.log('app service started', Env)
})
