import express from "express";
import profileController from "../controller/profile-controller.js";
import authController from "../controller/auth-controller.js";
import projectController from "../controller/project-controller.js";
import skillController from "../controller/skill-controller.js";
import educationController from "../controller/education-controller.js";
import blogController from "../controller/blog-controller.js";

const publicRouter = new express.Router();

// AUTH
publicRouter.post('/login', authController.login);

// PROFILE
publicRouter.get('/profile', profileController.get);

// PROJECT
publicRouter.get('/projects', projectController.getAll);
publicRouter.get('/project/:id', projectController.get);

// SKILL
publicRouter.get('/skills', skillController.getAll);
publicRouter.get('/skill/:id', skillController.get);

// EDUCATION
publicRouter.get('/educations', educationController.getAll);
publicRouter.get('/education/:id', educationController.get);

// EDUCATION
publicRouter.get('/blogs', blogController.getAll);
publicRouter.get('/blog/:id', blogController.get);

export {
    publicRouter
};