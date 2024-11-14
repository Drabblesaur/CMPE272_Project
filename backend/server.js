const fastify = require("fastify")({ logger: true });
//const cors = require("@fastify/cors");

fastify.get("/messages", async (request, reply) => { 
    return{
        message: "Hello World"
    }
})

const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();