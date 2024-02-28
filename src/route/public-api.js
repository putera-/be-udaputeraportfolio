import express from 'express';
import profileController from '../controller/profile-controller.js';
import authController from '../controller/auth-controller.js';
import projectController from '../controller/project-controller.js';
import skillController from '../controller/skill-controller.js';
import educationController from '../controller/education-controller.js';
import blogController from '../controller/blog-controller.js';
import fileService from '../service/file-service.js';
import { isFileExist } from '../middleware/file-middleware.js';
import experienceController from '../controller/experience-controller.js';
import userController from '../controller/user-controller.js';
import logController from '../controller/log-controller.js';

const publicRouter = new express.Router();

// create upload path
fileService.createPath('./uploads');
fileService.createPath('./uploads/avatar');
fileService.createPath('./uploads/photos');

// accesslog
publicRouter.post('/access-log', logController.createWebAccessLog);

publicRouter.use('/uploads', express.static('./uploads'));
publicRouter.use('/uploads', isFileExist);

// AUTH
publicRouter.post('/login', authController.login);

// USER
publicRouter.get('/is_user_exist', userController.is_user_exist);
publicRouter.post('/create_user', userController.create_user);

// PROFILE
publicRouter.get('/portfolio', profileController.getPortFolio);
publicRouter.get('/profile', profileController.get);

// PROJECT
publicRouter.get('/projects', projectController.getAll);
publicRouter.get('/project/:id', projectController.get);

// SKILL
publicRouter.get('/skill_by_categories', skillController.getByCategory);
publicRouter.get('/skills', skillController.getAll);
publicRouter.get('/skill/:id', skillController.get);

// EDUCATION
publicRouter.get('/educations', educationController.getAll);
publicRouter.get('/education/:id', educationController.get);

// EDUCATION
publicRouter.get('/blogs', blogController.getAll);
publicRouter.get('/blog/:id', blogController.get);

// EXPERIENCE
publicRouter.get('/experiences', experienceController.getAll);
publicRouter.get('/experience/:id', experienceController.get);

export {
    publicRouter
};