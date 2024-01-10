import Joi from "joi";
import { isPassword, isString } from "./all-validation.js";

const updateUserValidation = Joi.object({
    name: isString,
    password: isPassword,
    password_confirm: isPassword
}).custom((value, helpers) => {
    if (value.password !== value.password_confirm) {
        return helpers.error("register.password.different");
    }

    return value;
}).message({
    'register.password.different': "Password and Password Confirm is not match"
});

export {
    updateUserValidation
};