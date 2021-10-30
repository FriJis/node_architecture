import { createSocketClient } from '../lib/App'
;(async () => {
    console.log('start')

    const io = await createSocketClient()

    io.on('connected', () => console.log('connected!'))
})()
