import fastify from "fastify";
//import cors from "@fastify/cors";
import aiController from './ai-controller.js';

const app = fastify({ logger: true }); // Creating a Fastify instance

// register ai controller
app.register(aiController,{prefix: '/ai'});

const start = async () => {
    try {
        await app.listen({ port: 8080 });
        app.log.info(`server listening on ${app.server.address().port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();