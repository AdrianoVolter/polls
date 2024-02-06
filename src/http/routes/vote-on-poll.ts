import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (request, reply) => {
    const voteOnPollBody = z.object({
     pollOptionId: z.string().uuid(),
    })

    const voteOnPollParams = z.object({
        pollId: z.string().uuid(),
        })

    const { pollId } = voteOnPollParams.parse(request.params)
    const { pollOptionId } = voteOnPollBody.parse(request.body)

    
    return reply.status(201).send()
  })

}