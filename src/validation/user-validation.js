import Joi from 'joi';
import { isPassword, isString } from './all-validation.js';

const updateUserValidation = Joi.object({
    name: isString.label("Name"),
    password: isPassword.label("Password"),
    password_confirm: isPassword.label("Password Confirm")
}).custom((value, helpers) => {
    if (value.password !== value.password_confirm) {
        return helpers.error('register.password.different');
    }

    return value;
}).message({
    'register.password.different': 'Password and Password Confirm is not match'
});

export {
    updateUserValidation
};