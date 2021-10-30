export const emailPrefix = 'email'
export const userOnlinePrefix = 'user/online'

export type Prefix = typeof emailPrefix | typeof userOnlinePrefix

export function createKey(prefix: Prefix, key: string) {
    return `${prefix}/${key}`
}
