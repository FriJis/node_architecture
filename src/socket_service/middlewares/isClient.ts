import { Namespace } from 'socket.io'
import { getAuth } from '../../lib/utils/Auth'

export function isClient(
    io: Namespace
) {
    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token as string | undefined
        if (!token) return
        const user = await getAuth(socket.handshake.auth.token)
        if (!user) return
        socket.join(`/user/${user.id}`)
        socket.emit('connected')
        next()
    })
}
