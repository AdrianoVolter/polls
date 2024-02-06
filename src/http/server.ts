import fastify from 'fastify';
import { PrismaClient} from '@prisma/client';
import { z } from 'zod';

const app = fastify();

const prisma = new PrismaClient();


app.listen({ port: 3333}).then(() => {
    console.log(`Server is running on port http://localhost:3333`);
    }
);