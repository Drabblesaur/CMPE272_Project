import fastify from "fastify";
import cors from "@fastify/cors";
import aiController from "./ai-controller.js";
import dotenv from "dotenv";
import oauth2 from "@fastify/oauth2";
import dbController from "./dbcontroller.js";
import projectController from "./prjcontroller.js";
import oauthController from "./oauthcontroller.js";
import mongoose from "mongoose";
import { User, validate } from "./models/user.js";
import UserData from "./models/userData.js";
import axios from "axios";
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
  startRedirectPath: "/auth/login",
  callbackUri: process.env.GITHUB_REDIRECT_URI,
});

// register ai controller
app.register(aiController, { prefix: "/ai" });
app.register(dbController, { prefix: "/db" });
app.register(projectController, { prefix: "/prj" });
app.register(loginController, { prefix: "/login" });
//app.register(oauthController, { prefix: "/auth" })
httpsApp.register(aiController, { prefix: "/ai" });
httpsApp.register(dbController, { prefix: "/db" });
httpsApp.register(projectController, { prefix: "/prj" });
httpsApp.register(loginController, { prefix: "/login" });
//httpsApp.register(oauthController, { prefix: "/auth" })

// Endpoint to handle GitHub OAuth callback
app.get("/auth/callback", async (req, reply) => {
  console.log("Callback URI:", process.env.GITHUB_REDIRECT_URI);

  try {
    // Step 1: Get the access token from GitHub
    const token = await app.githubOAuth.getAccessTokenFromAuthorizationCodeFlow(req);
    console.log(token);

    // Step 2: Check if token is valid
    if (token && token.token && token.token.access_token) {
      console.log("Access Token:", token.token.access_token);

      // Step 3: Fetch the user profile from GitHub
      const response = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token.token.access_token}`, // Corrected string interpolation
        },
      });

      const user = response.data; // Extract user data
      console.log("User:", user);

      // Step 4: Check if the user already exists in the database
      const userData = await UserData.findOne({ githubId: user.id });

      if (!userData) {
        // Step 5: If user doesn't exist, create a new user
        const newUser = new UserData({
          user: user.id, // Corrected to use user.id
          githubID: user.url,
          accessToken: token.token.access_token,
          refreshToken: token.token.refresh_token, // Corrected refresh token
          profileData: {
            name: user.name,
            email: req.email || "john.doe@example.com", // Default email if not provided
            avatar_url: user.avatar_url || "https://example.com/avatar.jpg", // Dynamically use avatar URL from GitHub
          },
          data:  [], // Default data if not provided
        });

        await newUser.save();

        // Step 6: Redirect to home page with new user data
        reply.redirect(
          `http://localhost:3000/home?userId=${encodeURIComponent(newUser._id)}`
        );
      } else {
        // Step 7: If user exists, redirect to home page with existing user data
        reply.redirect(
          `http://localhost:3000/home?userId=${encodeURIComponent(userData._id)}`
        );
      }
    } else {
      // Token retrieval failed
      console.error("Failed to retrieve token:", token);
      reply.status(400).send({
        success: false,
        message: "GitHub authentication failed.",
      });
    }
  } catch (error) {
    // Catch any errors that occur during the OAuth process
    console.error("Error in GitHub OAuth flow:", error);
    reply.status(500).send({
      success: false,
      message: "Internal Server Error during authentication.",
    });
  }
});


httpsApp.get("/auth/callback", async (req, reply) => {
  console.log("Callback URI:", process.env.GITHUB_REDIRECT_URI);
  try {
    const token = await app.githubOAuth.getAccessTokenFromAuthorizationCodeFlow(
      req
    );
    console.log(token);

    if (token && token.token && token.token.access_token) {
      console.log("Access Token:", token.token.access_token);
      // Fetch user data from GitHub
      const gitUser = await app.githubOAuth.getUserProfile(
        token.token.access_token
      );
      // check if user exists in the database
      const userData = await UserData.findOne({ githubId: gitUser.id });
      if (!userData) {
        // Create a new user in the database
        const user = new User({
          firstName: gitUser.login,
          lastName: "",
          email: gitUser.email || "",
          password: gitUser.node_id,
        });
        await user.save();
        // Create a new userdata in the database
        const newUserData = new UserData({
          user: user._id,
          githubID: req.body.githubID,
          accessToken: req.body.accessToken || null,
          refreshToken: req.body.refreshToken || null,
          profileData: {
            name: gitUser.login,
            email: gitUser.email || "",
            avatar_url: gitUser.avatar_url,
          },
          data: req.body.data || [],
        });
        await newUserData.save();
        reply.redirect(
          `https://earnest-buttercream-edca31.netlify.app/home?userId=${encodeURIComponent(
            newUserData._id
          )}`
        );
      } else {
        reply.redirect(
          `https://earnest-buttercream-edca31.netlify.app/home?userId=${encodeURIComponent(
            userData._id
          )}`
        );
      }
      //  reply.redirect("https://earnest-buttercream-edca31.netlify.app")
    } else {
      console.error("Failed to retrieve token:", token);
      reply.status(400).send({
        success: false,
        message: "GitHub authentication failed.",
      });
    }
  } catch (error) {
    console.error("Error in GitHub OAuth flow:", error);
    reply.status(500).send({
      success: false,
      message: "Internal Server Error during authentication.",
    });
  }
});

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
