import Joi from "joi";

const getUserValidation = Joi.string().email().max(100).required();

const updateUserValidation = Joi.object({
    name: Joi.string().min(3).max(100).trim().required(),
    email: Joi.string().email().min(3).max(100).trim().required(),
    password: Joi.string().min(6).max(100).trim(),
    confirm_password: Joi.string().min(6).max(100).trim()
}).custom((value, helpers) => {
    if (value.password !== value.confirm_password) {
        return helpers.error("register.password.different")
    }

    return value;
}).message({
    'register.password.different': "Password and Password Confirm is not match"
});

export {
    getUserValidation,
    updateUserValidation
}