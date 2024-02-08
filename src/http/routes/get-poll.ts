import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";
import { redis } from "../../lib/redis";

export async function getPoll(app: FastifyInstance) {
  app.get("/polls/:pollId", async (request, reply) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = getPollParams.parse(request.params);

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
        include: {
            options: {
                select:{
                    id:true,
                    title:true,
                }
            }
        },
    });

    if (!poll) { // If the poll does not exist, return a 404 error
      return reply.status(404).send({ error: "Poll not found" });
    }

    const result = await redis.zrange(`poll:${pollId}`, 0, -1, "WITHSCORES"); // Get the poll results from Redis

    console.log(result);
    return reply.send({ poll});
    });
}
