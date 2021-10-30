import { Response } from 'express'

type DataError = { [key: string]: string }[]

export function useResponseHelper(data: any) {
    return {
        asCollection() {
            return {
                items: data,
            }
        },
        asRaw() {
            return data
        },
    }
}

export function useResponse(res: Response) {
    return {
        success(data: any, statusCode: number) {
            res.status(statusCode).json(data)
        },
        errors: {
            custom(data: DataError, statusCode: number) {
                res.status(statusCode).json({
                    errors: data,
                })
            },
            notFound() {
                res.status(404).json({
                    errors: [{ msg: 'Not found' }],
                })
            },
            unauthorized() {
                res.status(401).json({
                    errors: [{ msg: 'Unauthorized' }],
                })
            },
        },
    }
}
