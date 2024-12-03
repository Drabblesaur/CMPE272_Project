import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  schema: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
