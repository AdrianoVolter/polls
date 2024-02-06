import fastify from 'fastify';
import { createPoll } from './routes/create-poll';

const app = fastify();

app.register(createPoll);
 
app.listen({ port: 3333}).then(() => {
    console.log(`Server is running on port http://localhost:3333`);
    }
);