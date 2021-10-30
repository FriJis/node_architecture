import { Request } from 'express'
import { User } from '../models/app/User'
import { jwt } from './Jwt'

export async function getAuth(token: string) {
    const p = jwt.verify(token)
    if (!p) return
    return (await User.findOne({ where: { id: p.user.id } }))?.get()
}
