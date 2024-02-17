import Joi from 'joi';
import { isPassword, isString, isEmail } from './all-validation.js';

const updateUserValidation = Joi.object({
    name: isString.label("Name"),
    email: isEmail.label("Email"),
    password: isPassword.label("Password"),
    password_confirm: isPassword
        .valid(Joi.ref('password'))
        .label("Password Confirm")
        .options({
            messages: {
                'any.only': '{{#label}} is not match'
            }
        })
});

export {
    updateUserValidation
};