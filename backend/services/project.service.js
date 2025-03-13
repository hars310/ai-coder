import Project from "../models/project.model.js";

export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Name is required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }

    const project = new Project({ name, users: [userId] });
    return await project.save();
    

};
export const getAllProjects = async () => {
  try {
    const projects = await Project.find();
    return projects;
  } catch (error) {
    throw new Error("Error fetching projects: " + error.message);
  }
};
