import { startExpress } from '../lib/App'
import _init from '../lib/models'
import { HighAPIRouter } from './router'

_init()
startExpress(HighAPIRouter, { port: 3002, baseUrl: '/h-api' }).then(() => {
    console.log('highload service started')
})
