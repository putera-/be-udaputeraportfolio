import express from "express"
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import authController from "../controller/auth-controller.js";

const apiRouter = new express.Router();
apiRouter.use(authMiddleware);

apiRouter.delete('/logout', authController.logout)
apiRouter.get('/user', userController.get);
apiRouter.patch('/user', userController.update);

export {
    apiRouter
}