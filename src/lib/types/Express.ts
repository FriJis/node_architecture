import { Request } from 'express'
import { UserAttributes } from './User'

type Headers = {
    authorization?: string
}

export interface PostRequest<T extends {} = {}> extends Request {
    body: T
    headers: Headers
    auth?: UserAttributes | null
}
export interface GetRequest<T extends {} = {}> extends Request {
    params: T
    headers: Headers
    auth?: UserAttributes | null
}
