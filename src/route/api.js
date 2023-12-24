import express from "express"
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import authController from "../controller/auth-controller.js";
import skillController from "../controller/skill-controller.js";
import educationController from "../controller/education-controller.js";
import profileController from "../controller/profile-controller.js";
import projectController from "../controller/project-controller.js";

const apiRouter = new express.Router();
apiRouter.use(authMiddleware);

// AUTH
apiRouter.delete('/logout', authController.logout);

// USER
apiRouter.route('/user')
    .get(userController.get)
    .patch(userController.update);

// PROFILE
apiRouter.put('/profile', profileController.update);

// SKILL
apiRouter.get('/skills', skillController.getAll);
apiRouter.post('/skill', skillController.create);
apiRouter.route('/skill/:id')
    .get(skillController.get)
    .put(skillController.update)
    .delete(skillController.remove);


// EDUCATION
apiRouter.get('/educations', educationController.getAll);
apiRouter.post('/education', educationController.create);
apiRouter.route('/education/:id')
    .get(educationController.get)
    .put(educationController.update)
    .delete(educationController.remove);

// PROJECT
apiRouter.post('/project', projectController.create);
apiRouter.route('/project/:id')
    .put(projectController.update)
    .delete(projectController.remove);

export {
    apiRouter
}