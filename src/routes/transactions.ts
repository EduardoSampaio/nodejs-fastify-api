import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { knex } from "../database";

export async function transactionRoutes(app: FastifyInstance) {

    app.get('/', async () => {
        const transactions = await knex('transactions').select();

        return {
            transactions
        }
    })

    app.get('/summary', async () => {
        const transactions = await knex('transactions').sum('amount', { as: 'amount' });

        return {
            transactions
        }
    })

    app.get('/:id', async (request) => {
        const getTransactionParams = z.object({
            id: z.string().uuid(),
        })

        const { id } = getTransactionParams.parse(request.params);

        const transaction = await knex('transactions').where('id', id).first();

        return {
            transaction
        }
    })

    app.post('/', async (request, response) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        });

        const { title, amount, type } = createTransactionBodySchema.parse(request.body);

        await knex('transactions').insert({
            id: crypto.randomUUID(),
            title,
            amount,
            type: type === 'credit' ? amount : amount * -1
        });

        return response.status(201).send();
    })
}