import { tedis } from '../lib/redis/core'
;(async () => {
    const keys = await tedis.keys('*')

    const res = []
    for (const key of keys) {
        const value = await tedis.get(key)
        res.push({ key, value })
    }
    console.log(res)
})()
