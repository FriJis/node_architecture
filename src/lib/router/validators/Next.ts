import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { useResponse } from '../../hooks/useResponse'

export function Next(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    const response = useResponse(res)

    if (!errors.isEmpty()) {
        return response.errors.custom(errors.array() as [], 400)
    }

    return next()
}
