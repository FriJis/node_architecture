import { Tedis } from 'tedis'
import { Env } from '../Env'

export const tedis = new Tedis({
    host: 'redis',
    port: +(Env.redis.port || '6379'),
})

export function codeGenerate() {
    return Math.floor(Math.random() * 1000000).toString()
}
