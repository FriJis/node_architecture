import { NextFunction, Response } from 'express'
import { useResponse } from '../../hooks/useResponse'
import { GetRequest, PostRequest } from '../../types/Express'

export const isAuth = async (
    req: PostRequest | GetRequest,
    res: Response,
    next: NextFunction
) => {
    const response = useResponse(res)

    if (!req.auth) {
        return response.errors.unauthorized()
    }
    next()
}
