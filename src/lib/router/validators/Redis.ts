import { NextFunction, Request, Response } from 'express'
import { useResponse } from '../../hooks/useResponse'
import { emailRedis } from '../../redis'

export function hasEmailCode() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const response = useResponse(res)
        const { email, code } = req.body
        const checkedCode = await emailRedis.checkCode(email, code)

        if (!checkedCode) {
            return response.errors.unauthorized()
        }
        next()
    }
}
