import { authCodeExpires, userCanBeOnline } from '../config/App'
import { codeGenerate, tedis } from './core'
import { createKey, emailPrefix, userOnlinePrefix } from './_prefixes'

export const emailRedis = {
    createCode: async (email: string) => {
        const rand = codeGenerate()
        await tedis.set(createKey(emailPrefix, email), rand)
        await tedis.expire(createKey(emailPrefix, email), authCodeExpires)
        return rand
    },
    checkCode: async (email: string, code: string) => {
        const codeFromStorage = await tedis.get(createKey(emailPrefix, email))
        return code == codeFromStorage
    },
    remove: async (email: string) => {
        await tedis.del(createKey(emailPrefix, email))
    },
}

export const userRedis = {
    setUserOnline: async (userId: string) => {
        await tedis.set(createKey(userOnlinePrefix, userId), 'true')
        await tedis.expire(createKey(userOnlinePrefix, userId), userCanBeOnline)
    },
    checkUserOnline: async (userId: string) => {
        const status = await tedis.get(createKey(userOnlinePrefix, userId))
        return status === 'true'
    },
    getUserOnlineList: async () => {
        const keys = await tedis.keys(createKey(userOnlinePrefix, '*'))
        return keys.map((k) => k.replace(createKey(userOnlinePrefix, ''), ''))
    },
}
