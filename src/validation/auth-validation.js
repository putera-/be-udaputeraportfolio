import Joi from "joi";
import { isEmail, isPassword } from "./all-validation.js";

const authValidation = Joi.object({
    email: isEmail,
    password: isPassword
});

export {
    authValidation
};