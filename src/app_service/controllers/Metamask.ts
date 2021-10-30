import { Request, Response } from 'express'

export async function MetamaskMessage(req: Request, res: Response) {
    res.send('hello')
}
