import Joi from 'joi';
import { isPassword, isString, isEmail } from './all-validation.js';

const userValidation = {
    name: isString.required().label('Name'),
    email: isEmail.required().label('Email'),
    password: isPassword.required().label('Password'),
    password_confirm: isPassword.required()
        .valid(Joi.ref('password'))
        .label('Password Confirm')
        .options({
            messages: {
                'any.only': '{{#label}} is not match'
            }
        })
}


const createUserValidation = Joi.object({
    ...userValidation
});

const updateUserValidation = Joi.object({
    ...userValidation,
    old_password: isPassword.required().label('Old Password')
});

export {
    createUserValidation,
    updateUserValidation
};