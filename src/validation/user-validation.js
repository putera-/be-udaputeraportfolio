import Joi from 'joi';
import { isPassword, isString } from './all-validation.js';

const updateUserValidation = Joi.object({
    name: isString.required().label("Name"),
    password: isPassword.required().label("Password"),
    password_confirm: isPassword.required()
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