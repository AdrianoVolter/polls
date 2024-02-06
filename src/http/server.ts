import fastify from 'fastify';
import cookie from '@fastify/cookie'; 
import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-poll';
import { voteOnPoll } from './routes/vote-on-poll';

const app = fastify();

app.register(cookie,{
    secret: 'my-secret',
    hook: 'onRequest',
    parseOptions: {}
});

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
 
app.listen({ port: 3333}).then(() => {
    console.log(`Server is running on port http://localhost:3333`);
    }
);