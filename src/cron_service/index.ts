import cron from 'node-cron'
import _init from '../lib/models'
import { logSheduler } from './modules/log'

console.log('cron service started')
_init()
cron.schedule('*/10 * * * * *', logSheduler)
