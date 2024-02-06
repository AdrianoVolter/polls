import fastify from 'fastify';

const app = fastify();

app.post('/polls',(request) => {
    console.log(request.body);
    return "Hello World from Fastify!";
}
);

app.listen({ port: 3333}).then(() => {
    console.log(`Server is running on port http://localhost:3333`);
    }
);