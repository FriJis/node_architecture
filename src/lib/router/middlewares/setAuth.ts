import { NextFunction, Response } from 'express'
import { userRedis } from '../../redis'
import { GetRequest, PostRequest } from '../../types/Express'
import { getAuth } from '../../utils/Auth'

export async function setAuth(
    req: PostRequest<any> | GetRequest<any>,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers
    if (!authorization) return next()
    req.auth = await getAuth(authorization)
    if (req.auth?.id) userRedis.setUserOnline(req.auth.id)
    return next()
}
