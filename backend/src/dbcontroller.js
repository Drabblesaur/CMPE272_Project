import userDataModel from "./models/userData.js"; // Adjust the path as necessary
import UserData from "./models/userData.js"; // Adjust the path as necessary

const responseSchema = {
  response: {
    200: {
      properties: {
        message: { type: "string" },
        data: { type: "array" },
      },
      required: ["message", "data"],
    },
  },
};

const userDataController = (fastify, options, done) => {
  // Create user data
  fastify.post(
    "/userData",
    { schema: responseSchema },
    async (request, reply) => {
      const { githubID, accessToken, refreshToken, profileData, data } =
        request.body;
      try {
        const newUserData = new userDataModel({
          githubID,
          accessToken,
          refreshToken,
          profileData,
          data,
        });
        const savedData = await newUserData.save();
        return reply.send({
          message: "User data created successfully!",
          data: savedData,
        });
      } catch (error) {
        return reply
          .status(500)
          .send({ message: "Error creating user data", error: error.message });
      }
    }
  );

  // Get all user data
  fastify.get(
    "/userData",
    { schema: responseSchema },
    async (request, reply) => {
      try {
        const allUserData = await userDataModel.find(); // Retrieve all user data
        console.log("Retrieved user data:", allUserData); // Log the retrieved user data
        return reply.send({
          message: "User data retrieved successfully!",
          data: allUserData,
        });
      } catch (error) {
        console.error("Error retrieving user data:", error); // Log any errors
        return reply.status(500).send({
          message: "Error retrieving user data",
          error: error.message,
        });
      }
    }
  );

  // Get user data by githubID
  fastify.get(
    "/userData/:githubID",
    { schema: responseSchema },
    async (request, reply) => {
      const { githubID } = request.params; // Extract 'githubID' from params
      console.log(githubID);
      try {
        const userData = await userDataModel.findOne({ githubID }); // Query by 'githubID'
        if (!userData) {
          return reply.status(404).send({ message: "User data not found" });
        }
        // Return the githubID along with the user data
        return reply.send({
          message: "User data retrieved successfully",
          profileData: userData.profileData,
          data: userData.data,
        });
      } catch (error) {
        return reply.status(500).send({
          message: "Error retrieving user data",
          error: error.message,
        });
      }
    }
  );

  // Update only the data part of the user data by githubID
  fastify.put(
    "/addUserData/:githubID",
    { schema: responseSchema },
    async (request, reply) => {
      const { githubID } = request.params; // Extract the githubID from the URL parameters
      const { data } = request.body; // Get the data to update from the request body

      try {
        // Find the user by githubID and update only the data field
        const updatedUserData = await userDataModel.findOneAndUpdate(
          { githubID }, // Query by githubID
          { data }, // Update only the data field
          { new: true } // Return the updated document
        );

        // If no user is found, return a 404 status
        if (!updatedUserData) {
          return reply.status(404).send({ message: "User data not found" });
        }

        // Return a success message along with the updated user data
        return reply.send({
          message: "User data updated successfully!",
          data: updatedUserData.data,
        });
      } catch (error) {
        // Handle any errors that occur during the update
        return reply
          .status(500)
          .send({ message: "Error updating user data", error: error.message });
      }
    }
  );

  // Delete user data by ID
  fastify.delete(
    "/userData/:id",
    { schema: responseSchema },
    async (request, reply) => {
      const { id } = request.params;

      try {
        const deletedUserData = await userDataModel.findByIdAndDelete(id);
        if (!deletedUserData) {
          return reply.status(404).send({ message: "User data not found" });
        }
        return reply.send({ message: "User data deleted successfully!" });
      } catch (error) {
        return reply
          .status(500)
          .send({ message: "Error deleting user data", error: error.message });
      }
    }
  );

  done();
};

export default userDataController;