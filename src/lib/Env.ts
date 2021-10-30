import { config } from 'dotenv'
config()

function errorHandler(env: { [key: string]: string | undefined }) {
    const nullables = Object.entries(env)
        .filter(([, value]) => !value?.length)
        .map(([key]) => key)
    if (nullables.length) {
        throw new Error(`Fill ${nullables.join(', ')} in .env`)
    }
}

export const Env = (() => {
    const {
        REDIS_PORT,
        SMTP_HOST,
        SMTP_PORT,
        SMTP_SECURE,
        SMTP_USERNAME,
        SMTP_PASSWORD,
        JWT_SECRET,
        NODE_ENV,
        POSTGRES_DB,
        POSTGRES_USER,
        POSTGRES_PASSWORD,
        DATABASE_URL,
        SOCKET_SERVER_SECRET,
    } = process.env
    errorHandler({
        REDIS_PORT,
        JWT_SECRET,
        NODE_ENV,
        POSTGRES_DB,
        POSTGRES_USER,
        POSTGRES_PASSWORD,
        DATABASE_URL,
        SOCKET_SERVER_SECRET,
    })

    return {
        nodeEnv: NODE_ENV!,
        redis: {
            port: REDIS_PORT!,
        },
        smtp: {
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: SMTP_SECURE,
            user: SMTP_USERNAME,
            password: SMTP_PASSWORD,
        },
        postgres: {
            db: POSTGRES_DB!,
            user: POSTGRES_USER!,
            password: POSTGRES_PASSWORD!,
            url: DATABASE_URL!,
        },
        jwtSecret: JWT_SECRET!,
        socketSecret: SOCKET_SERVER_SECRET!,
    }
})()

export const isProd = Env.nodeEnv === 'prod'
