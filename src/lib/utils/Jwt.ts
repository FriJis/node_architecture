import { sign, verify } from 'jsonwebtoken'
import { Env } from '../Env'
import { UserAttributes } from '../types/User'

export const jwt = {
    sign(data: { user: UserAttributes }): string {
        return sign(data, Env.jwtSecret)
    },
    verify(token: string): { iat: number; user: UserAttributes } | undefined {
        return verify(token, Env.jwtSecret) as any
    },
}
