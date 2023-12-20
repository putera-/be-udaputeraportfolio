import express from "express"
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const apiRouter = new express.Router();
apiRouter.use(authMiddleware);

apiRouter.get('/user', userController.getUser);

export {
    apiRouter
}