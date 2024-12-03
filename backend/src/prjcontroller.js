import mongoose from "mongoose";
import Project from "./models/project.js";
import UserData from "./models/userData.js";

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

const projectController = (fastify, options, done) => {
  // Create project
  fastify.post(
    "/project",
    { schema: responseSchema },
    async (request, reply) => {
      const { userID, name, schema, code } = request.body;
      try {
        const newProject = new Project({
          userID,
          name,
          schema,
          code,
        });
        const savedProject = await newProject.save();
        return reply.send({
          message: "Project created successfully!",
          data: [savedProject],
        });
      } catch (error) {
        return reply
          .status(500)
          .send({ message: "Error creating project", error: error.message });
      }
    }
  );

  // Delete project
  fastify.delete(
    "/project/:id",
    { schema: responseSchema },
    async (request, reply) => {
      try {
        console.log(request.params.id);
        if (!request.params.id) {
          return reply.status(400).send({ message: "Project ID is required" });
        }
        if (mongoose.Types.ObjectId.isValid(request.params.id) === false) {
          return reply.status(400).send({ message: "Invalid project ID" });
        }
        const deletedProject = await Project.findByIdAndDelete(
          request.params.id
        );
        if (!deletedProject) {
          return reply.status(404).send({ message: "Project not found" });
        }
        await UserData.updateOne(
          { githubID: deletedProject.githubID },
          { $pull: { data: { _id: request.params.id } } }
        );
        return reply.send({
          message: "Project deleted successfully!",
          data: [request.params.id],
        });
      } catch (error) {
        return reply
          .status(500)
          .send({ message: "Error deleting project", error: error.message });
      }
    }
  );

  // Get all projects for a user
  fastify.get(
    "/projects/:userID",
    { schema: responseSchema },
    async (request, reply) => {
      const { ObjectID } = request.params;
      try {
        const projects = await Project.find({ ObjectID });
        return reply.send({
          message: "Projects retrieved successfully!",
          data: projects,
        });
      } catch (error) {
        return reply
          .status(500)
          .send({ message: "Error retrieving projects", error: error.message });
      }
    }
  );

  // Update Project code
  fastify.put(
    "/project/:id",
    { schema: responseSchema },
    async (request, reply) => {
      const { id } = request.params;
      const { code } = request.body;
      try {
        const updatedProject = await Project.findByIdAndUpdate(
          id,
          { code },
          { new: true }
        );
        if (!updatedProject) {
          return reply.status(404).send({ message: "Project not found" });
        }
        reply.send({
          message: "Project code updated successfully",
          data: [updatedProject],
        });
      } catch (error) {
        reply
          .status(500)
          .send({ message: "Error updating project code", error });
      }
    }
  );

  // Update Project schema
  fastify.put("/project/:id/schema", async (request, reply) => {
    const { id } = request.params;
    const { schema } = request.body;
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        id,
        { schema },
        { new: true }
      );
      if (!updatedProject) {
        return reply.status(404).send({ message: "Project not found" });
      }
      reply.send({
        message: "Project schema updated successfully",
        data: [updatedProject],
      });
    } catch (error) {
      reply
        .status(500)
        .send({ message: "Error updating project schema", error });
    }
  });

  done();
};

export default projectController;
