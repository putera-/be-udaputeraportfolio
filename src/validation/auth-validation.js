import Joi from 'joi';
import { isEmail, isPassword } from './all-validation.js';

const authValidation = Joi.object({
    email: isEmail.label('Email'),
    password: isPassword.label('Password')
});

export {
    authValidation
};