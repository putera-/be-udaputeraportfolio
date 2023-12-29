import Joi from "joi";
import { isEmail, isString, isURL } from "./all-validation.js";

const profileValidate = Joi.object({
    firstname: isString,
    lastname: isString,
    email: isEmail,
    bio: Joi.string().trim(),
    github: isURL,
    gitlab: isURL,
    linkedin: isURL,
    instagram: isURL,
    facebook: isURL,
    twitter: isURL
});

export {
    profileValidate
}