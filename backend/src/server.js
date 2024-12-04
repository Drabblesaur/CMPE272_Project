import fastify from "fastify";
import cors from "@fastify/cors";
import aiController from "./ai-controller.js";
import dotenv from "dotenv";
import oauth2 from "@fastify/oauth2";
import dbController from "./dbcontroller.js";
import projectController from "./prjcontroller.js";
import oauthController from "./oauthcontroller.js";
import mongoose from "mongoose";
// import { User, validate } from "./models/user.js";
// import UserData from "./models/userData.js";

import loginController from "./logincontroller.js";

dotenv.config();

const app = fastify({ logger: true }); // Creating a Fastify instance
const httpsApp = fastify({ logger: true });

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

// Register CORS
app.register(cors, {
  origin: "*", // Allow all origins
});

httpsApp.register(cors, {
  origin: "*", // Allow all origins
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

httpsApp.register(oauth2, {
  name: "githubOAuth",
  credentials: {
    client: {
      id: process.env.GITHUB_CLIENT_ID,
      secret: process.env.GITHUB_CLIENT_SECRET,
    },
    auth: oauth2.GITHUB_CONFIGURATION,
  },
  startRedirectPath: "/auth/signup",
  callbackUri: process.env.GITHUB_REDIRECT_URI,
});

// register ai controller
app.register(aiController, { prefix: "/ai" });
app.register(dbController, { prefix: "/db" });
app.register(projectController, { prefix: "/prj" });
app.register(loginController, { prefix: "/login" });
app.register(oauthController, { prefix: "/auth" });
httpsApp.register(aiController, { prefix: "/ai" });
httpsApp.register(dbController, { prefix: "/db" });
httpsApp.register(projectController, { prefix: "/prj" });
httpsApp.register(loginController, { prefix: "/login" });
httpsApp.register(oauthController, { prefix: "/auth" });

const start = async () => {
  try {
    await app.listen({ port: 8080 });
    app.log.info(`server listening on ${app.server.address().port}`);
    await httpsApp.listen({ port: 80, host: "0.0.0.0" });
    httpsApp.log.info(`server listening on ${httpsApp.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
