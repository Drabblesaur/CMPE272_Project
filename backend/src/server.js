import fastify from "fastify";
//import cors from "@fastify/cors";
import aiController from './ai-controller.js';
import dotenv from 'dotenv'; // Import dotenv
import oauth2 from '@fastify/oauth2';
dotenv.config();

const app = fastify({ logger: true }); // Creating a Fastify instance

// Register GitHub OAuth plugin
app.register(oauth2, {
    name: 'githubOAuth',
    credentials: {
        client: {
            id: process.env.GITHUB_CLIENT_ID,
            secret: process.env.GITHUB_CLIENT_SECRET
        },
        auth: oauth2.GITHUB_CONFIGURATION
    },
    startRedirectPath: '/auth/login',
    callbackUri: process.env.GITHUB_REDIRECT_URI
});

// Endpoint to handle GitHub OAuth callback
app.get('/auth/callback', async (req, reply) => {
    const token = await app.githubOAuth.getAccessTokenFromAuthorizationCodeFlow(req);

    if (token) {
        return reply.send({
            success: true,
            token,
            message: 'GitHub authentication successful!'
        });
    } else {
        return reply.status(400).send({
            success: false,
            message: 'GitHub authentication failed.'
        });
    }
});

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