import express from "express"
import profileController from "../controller/profile-controller.js";
import authController from "../controller/auth-controller.js";

const publicRouter = new express.Router();

publicRouter.get('/profile', profileController.getProfile);
publicRouter.post('/login', authController.login);

export {
    publicRouter
}