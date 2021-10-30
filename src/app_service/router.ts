import {
    AuthCode,
    AuthFetch,
    AuthLogin,
    AuthRecovery,
    AuthRegister,
} from './controllers/Auth'
import { Router } from 'express'
import { body } from 'express-validator'
import { Next } from '../lib/router/validators/Next'
import {
    HasUserByEmail,
    NotHasUserByEmail,
} from '../lib/router/validators/HasUser'
import { hasEmailCode } from '../lib/router/validators/Redis'

const router = Router()

router.post(
    '/login',
    body('email').notEmpty().isEmail().normalizeEmail().trim(),
    body('password').notEmpty().trim(),
    HasUserByEmail(),
    Next,
    AuthLogin
)

router.post(
    '/register',
    body('email').notEmpty().isEmail().normalizeEmail().trim(),
    body('password').notEmpty().trim(),
    body('code').notEmpty().trim().isNumeric(),
    NotHasUserByEmail(),
    hasEmailCode(),
    Next,
    AuthRegister
)

router.post(
    '/create-code',
    body('email').notEmpty().isEmail().normalizeEmail().trim(),
    Next,
    AuthCode
)

router.post(
    '/recover',
    body('email').notEmpty().isEmail().normalizeEmail().trim(),
    body('password').notEmpty().trim(),
    body('code').notEmpty().trim().isNumeric(),
    HasUserByEmail(),
    hasEmailCode(),
    Next,
    AuthRecovery
)

router.get('/', AuthFetch)

export const AppAPIRouter = router
