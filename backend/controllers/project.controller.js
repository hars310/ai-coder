import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import * as projectService from "../services/project.service.js";
import {validationResult}  from 'express-validator'

export const createProject = async (req,res) => {
  const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {name} = req.body
    
        const loggedUser = await User.findOne({email: req.user.email})
        const userId = loggedUser._id

        
        const project = await projectService.createProject({name, userId})
        res.status(201).json(project)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

}

export const getAllProjects = async (req,res) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const projects = await projectService.getAllProjects();
        // console.log(projects)
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}