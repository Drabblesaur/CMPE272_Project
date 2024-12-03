import mongoose from "mongoose";

// Define the UserData schema
const userDataSchema = new mongoose.Schema(
  {
    user: {
      // Reference to the User model
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // The name of the User model
      required: true,
    },
    githubID: {
      // Store the unique GitHub ID
      type: String,
      required: false,
      unique: true, // Ensure that each user has a unique GitHub ID
    },
    accessToken: {
      // Optional: Store the access token for API calls
      type: String,
      required: false,
    },
    refreshToken: {
      // Optional: Store the refresh token if applicable
      type: String,
      required: false,
    },
    profileData: {
      // Optional: Store additional profile data from GitHub
      type: Object,
      required: false,
    },
    data: {
      // Store an array of JSON objects
      type: [Object], // Change to an array of objects
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the UserData model
const UserData = mongoose.model("UserData", userDataSchema);

// Export the UserData model as default
export default UserData;
