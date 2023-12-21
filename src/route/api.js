import express from "express"
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import authController from "../controller/auth-controller.js";
import skillController from "../controller/skill-controller.js";

const apiRouter = new express.Router();
apiRouter.use(authMiddleware);

// auth
apiRouter.delete('/logout', authController.logout)

// user
apiRouter.get('/user', userController.get);
apiRouter.patch('/user', userController.update);

// skill
apiRouter.get('/skill/:id', skillController.get)
apiRouter.post('/skill', skillController.create)

export {
    apiRouter
}