import express from "express"
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import authController from "../controller/auth-controller.js";
import skillController from "../controller/skill-controller.js";
import educationController from "../controller/education-controller.js";

const apiRouter = new express.Router();
apiRouter.use(authMiddleware);

// AUTH
apiRouter.delete('/logout', authController.logout);

// USER
apiRouter.get('/user', userController.get);
apiRouter.patch('/user', userController.update);

// SKILL
apiRouter.get('/skills', skillController.getAll);
apiRouter.get('/skill/:id', skillController.get);
apiRouter.post('/skill', skillController.create);
apiRouter.put('/skill/:id', skillController.update);
apiRouter.delete('/skill/:id', skillController.remove);

// EDUCATION
apiRouter.get('/educations', educationController.getAll);
apiRouter.get('/education/:id', educationController.get);
apiRouter.post('/education', educationController.create);
apiRouter.put('/education/:id', educationController.update);
apiRouter.delete('/education/:id', educationController.remove);

export {
    apiRouter
}