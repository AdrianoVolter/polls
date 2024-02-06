import fastify from 'fastify';
import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-poll';

const app = fastify();

app.register(createPoll);
app.register(getPoll);
 
app.listen({ port: 3333}).then(() => {
    console.log(`Server is running on port http://localhost:3333`);
    }
);