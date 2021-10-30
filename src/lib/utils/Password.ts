import { hashSync } from 'bcrypt'

export function createPass(password: string) {
    return hashSync(password, 4)
}
