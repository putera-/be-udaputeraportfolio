import Joi from "joi";

const authValidation = Joi.object({
    email: Joi.string().email().min(3).max(100).trim().required(),
    password: Joi.string().min(6).max(100).trim().required()
});

export {
    authValidation
}