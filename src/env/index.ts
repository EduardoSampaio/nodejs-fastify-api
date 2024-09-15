import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    DATABASE_URL: z.string(),
    PORT: z.string().default('3333'),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
})

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.log('Invalid enviroment variable.', _env.error.format());

    throw new Error('Invalid enviroment variable.')
}

export const env = _env.data;