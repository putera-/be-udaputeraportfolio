import Joi from 'joi';
import { isEmail, isPassword } from './all-validation.js';

const authValidation = Joi.object({
    email: isEmail.required().label('Email'),
    password: isPassword.required().label('Password')
});

export {
    authValidation
};