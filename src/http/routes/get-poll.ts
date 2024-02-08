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
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!poll) {
      // If the poll does not exist, return a 404 error
      return reply.status(404).send({ error: "Poll not found" });
    }

    const result = await redis.zrange(`poll:${pollId}`, 0, -1, "WITHSCORES"); // Get the poll results from Redis

    const votes = result.reduce((obj, line, index) => {
      if (index % 2 === 0) {
        const score = result[index + 1];

        Object.assign(obj, { [line]: Number(score) });
      }

      return obj;
    }, {} as Record<string, number>);

    return reply.send({  // Return the poll and its results
      poll: {
        id: poll.id,
        title: poll.title,
        options: poll.options.map((option) => ({
          id: option.id,
          title: option.title,
          score:(option.id in votes) ? votes[option.id] : 0,
        })),
      },
     });
  });
}
