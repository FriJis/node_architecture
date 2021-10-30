import { Namespace } from 'socket.io'
import { Env } from '../../lib/Env'

export function isServer(
    io: Namespace
) {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token as string | undefined
        if (token !== Env.socketSecret) return
        socket.emit('connected')
        next()
    })
}
