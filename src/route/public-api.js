import express from "express"
import profileController from "../controller/profile-controller.js";
import authController from "../controller/auth-controller.js";
import projectController from "../controller/project-controller.js";

const publicRouter = new express.Router();

// AUTH
publicRouter.post('/login', authController.login);

// PROFILE
publicRouter.get('/profile', profileController.get);

// PROJECT
publicRouter.get('/projects', projectController.getAll);
publicRouter.get('/project/:id', projectController.get);

export {
    publicRouter
}