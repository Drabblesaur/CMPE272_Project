import fastify from "fastify";
//import cors from "@fastify/cors";
import aiController from "./ai-controller.js";
import dotenv from "dotenv";
import oauth2 from "@fastify/oauth2";
import dbController from "./dbcontroller.js";
import projectController from "./prjcontroller.js";
import mongoose from "mongoose";

dotenv.config();

const app = fastify({ logger: true }); // Creating a Fastify instance

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    // Ensure you have MONGODB_URI in your .env file
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Register GitHub OAuth plugin
app.register(oauth2, {
  name: "githubOAuth",
  credentials: {
    client: {
      id: process.env.GITHUB_CLIENT_ID,
      secret: process.env.GITHUB_CLIENT_SECRET,
    },
    auth: oauth2.GITHUB_CONFIGURATION,
  },
  startRedirectPath: "/auth/login",
  callbackUri: process.env.GITHUB_REDIRECT_URI,
});

// Endpoint to handle GitHub OAuth callback
app.get("/auth/callback", async (req, reply) => {
  const token = await app.githubOAuth.getAccessTokenFromAuthorizationCodeFlow(
    req
  );
  console.log(token);
  if (token) {
    // return reply.send({
    //     success: true,
    //     token,
    //     message: 'GitHub authentication successful!'
    // });
    reply.redirect("http://localhost:3000/home");
  } else {
    return reply.status(400).send({
      success: false,
      message: "GitHub authentication failed.",
    });
  }
});

// register ai controller
app.register(aiController, { prefix: "/ai" });
app.register(dbController, { prefix: "/db" });
app.register(projectController, { prefix: "/prj" });

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
