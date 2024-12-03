import fastify from "fastify";
import cors from "@fastify/cors";
import aiController from "./ai-controller.js";
import dotenv from "dotenv";
import oauth2 from "@fastify/oauth2";
import dbController from "./dbcontroller.js";
import projectController from "./prjcontroller.js";
import mongoose from "mongoose";

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
})

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

app.post("/signup", async (req, res) => {
  // Validate the request body
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  // Check if the user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .send({ success: false, message: "User already registered." });

  // Create a new user
  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  // Save the user to the database
  await user.save();

  // Generate an auth token
  const token = user.generateAuthToken();

  // Return the token
  res.send({ success: true, token });
});

// register ai controller
app.register(aiController, { prefix: "/ai" });
app.register(dbController, { prefix: "/db" });
app.register(projectController, { prefix: "/prj" });
httpsApp.register(aiController, { prefix: "/ai" });
httpsApp.register(dbController, { prefix: "/db" });
httpsApp.register(projectController, { prefix: "/prj" });

const start = async () => {
  try {
    await app.listen({ port: 8080 });
    app.log.info(`server listening on ${app.server.address().port}`);
    await httpsApp.listen({ port: 80 });
    httpsApp.log.info(`server listening on ${httpsApp.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
