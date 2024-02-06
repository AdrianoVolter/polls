import { z } from "zod";
import { randomUUID } from "node:crypto";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function voteOnPoll(app: FastifyInstance) {
  app.post("/polls/:pollId/votes", async (request, reply) => {
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    });

    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = voteOnPollParams.parse(request.params);
    const { pollOptionId } = voteOnPollBody.parse(request.body);

    let {sessionID} = request.cookies;

    if (!sessionID) {
      sessionID = randomUUID();
      reply.setCookie("sessionID", sessionID, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        signed: true,
        httpOnly: true,
      });
    }
    
    return reply.status(201).send({
        sessionID,
        });
  });
}
