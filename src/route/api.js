import express from 'express';
import userController from '../controller/user-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import authController from '../controller/auth-controller.js';
import skillController from '../controller/skill-controller.js';
import educationController from '../controller/education-controller.js';
import profileController from '../controller/profile-controller.js';
import projectController from '../controller/project-controller.js';
import blogController from '../controller/blog-controller.js';
import logController from '../controller/log-controller.js';
import experienceController from '../controller/experience-controller.js';
import { uploadImage } from '../middleware/file-middleware.js';

const apiRouter = new express.Router();
apiRouter.use(authMiddleware);

// AUTH
apiRouter.delete('/logout', authController.logout);

// USER
apiRouter.route('/user')
    .get(userController.get)
    .put(userController.update);

// PROFILE
apiRouter.put('/profile', uploadImage.single('avatar'), profileController.update);

// SKILL
apiRouter.post('/skill', skillController.create);
apiRouter.route('/skill/:id')
    .put(skillController.update)
    .delete(skillController.remove);

// EDUCATION
apiRouter.post('/education', educationController.create);
apiRouter.route('/education/:id')
    .put(educationController.update)
    .delete(educationController.remove);

// EXPERIENCE
apiRouter.post('/experience', experienceController.create);
apiRouter.route('/experience/:id')
    .put(experienceController.update)
    .delete(experienceController.remove);

// PROJECT
apiRouter.post('/project', uploadImage.array('photos', 10), projectController.create);
apiRouter.put('/project/:id', uploadImage.array('new_photos', 10), projectController.update);
apiRouter.delete('/project/:id', projectController.remove);

// BLOG
apiRouter.post('/blog', uploadImage.array('photos', 10), blogController.create);
apiRouter.put('/blog/:id', uploadImage.array('new_photos', 10), blogController.update);
apiRouter.delete('/blog/:id', blogController.remove);

// LOG
apiRouter.get('/web_access_log', logController.getWebAccessLog);
apiRouter.get('/web_access_log/:session', logController.getWebAccessLogBySession);
apiRouter.get('/access_log', logController.getAccessLog);
apiRouter.get('/error_log', logController.getErrorLog);

export {
    apiRouter
};