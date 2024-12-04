import mongoose from "mongoose";
import { User, validate } from "./models/user.js";
import UserData from "./models/userData.js";

const loginController = (fastify, options, done) => {
  fastify.post("/signup", async (req, res) => {
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

    // Save the user
    await user.save();

    const fullName = `${user.firstName} ${user.lastName}`;
    // Create a new UserData document
    const userData = new UserData({
      user: user._id,
      githubID: req.body.githubID || user.email,
      accessToken: req.body.accessToken || null,
      refreshToken: req.body.refreshToken || null,
      profileData: {
        name: fullName,
        email: req.body.email || "john.doe@example.com",
        avatar_url: "https://example.com/avatar.jpg",
      },
      data: req.body.data || [],
    });

    // Save the UserData document
    await userData.save();

    // Send a success response
    res.send({
      success: true,
      message: "User registered successfully.",
      userId: userData._id,
    });
  });

  fastify.post("/login", async (req, res) => {
    // Validate the request body
    const { email, password } = req.body;

    // Check if the user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid email or password." });
    }

    // Compare the provided password with the stored password as plaintext
    if (user.password !== password) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid email or password." });
    }

    // Login successful, get the user's UserData document
    const userData = await UserData.findOne({ user: user._id });

    res.send({ success: true, userId: userData._id });
  });
  done();
};

export default loginController;
