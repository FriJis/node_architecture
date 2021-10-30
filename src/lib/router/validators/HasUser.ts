import { NextFunction, Request, Response } from 'express'
import { useResponse } from '../../hooks/useResponse'
import { User } from '../../models/app/User'

export function HasUserByEmail() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const response = useResponse(res)
        const { email } = req.body
        const user = (await User.findOne({ where: { email } }))?.get()

        if (!user) {
            return response.errors.unauthorized()
        }
        next()
    }
}

export function NotHasUserByEmail() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const response = useResponse(res)
        const { email } = req.body
        const user = (await User.findOne({ where: { email } }))?.get()

        if (user) {
            return response.errors.unauthorized()
        }
        next()
    }
}
