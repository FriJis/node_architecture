import { Response } from 'express'
import { compareSync } from 'bcrypt'
import { emailRedis } from '../../lib/redis'
import { createTransport, sendMail } from '../../lib/mail'
import { jwt } from '../../lib/utils/Jwt'

import { User } from '../../lib/models/app/User'
import { GetRequest, PostRequest } from '../../lib/types/Express'
import { useResponse } from '../../lib/hooks/useResponse'

export async function AuthCode(
    req: PostRequest<{ email: string }>,
    res: Response
) {
    const response = useResponse(res)

    const { email } = req.body
    const code = await emailRedis.createCode(email)
    const transporter = createTransport()
    await sendMail(await transporter, email, 'test', code)
    return response.success('SENDED', 200)
}

export async function AuthRegister(
    req: PostRequest<{ email: string; password: string; code: string }>,
    res: Response
) {
    const response = useResponse(res)

    const { email, password, code } = req.body
    if (!(await emailRedis.checkCode(email, code))) {
        return res.sendStatus(401)
    }
    const user = await User.create({
        email,
        password,
    })

    const token = jwt.sign({ user: user.get() })

    await emailRedis.remove(email)

    return response.success(
        {
            token,
            user,
        },
        200
    )
}

export async function AuthLogin(
    req: PostRequest<{ email: string; password: string }>,
    res: Response
) {
    const response = useResponse(res)

    const { email, password } = req.body
    const user = (await User.findOne({ where: { email } }))?.get()
    if (!user) {
        return
    }

    if (!compareSync(password, user.password)) {
        return res.sendStatus(401)
    }
    const token = jwt.sign({ user })
    return response.success(
        {
            token,
            user,
        },
        200
    )
}

export async function AuthFetch(req: GetRequest, res: Response) {
    const response = useResponse(res)
    if (req.auth) {
        return res.json(req.auth)
    }
    return response.errors.unauthorized()
}

export async function AuthRecovery(
    req: PostRequest<{ email: string; password: string; code: string }>,
    res: Response
) {
    const response = useResponse(res)

    const { email, password, code } = req.body

    const user = await User.findOne({
        where: { email },
    })
    if (!user || (await emailRedis.checkCode(email, code))) {
        return res.sendStatus(401)
    }
    await user.update({
        password,
    })

    const token = jwt.sign({ user: user.get() })

    await emailRedis.remove(email)

    return response.success(
        {
            token,
            user,
        },
        200
    )
}
