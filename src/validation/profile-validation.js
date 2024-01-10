import Joi from 'joi';
import { isEmail, isString, isText, isURL } from './all-validation.js';

const profileValidate = Joi.object({
    firstname: isString,
    lastname: isString,
    email: isEmail,
    dob: Joi.date().required(),
    address: isText,
    bio: isText,
    web: isURL,
    github: isURL,
    gitlab: isURL,
    linkedin: isURL,
    instagram: isURL,
    facebook: isURL,
    twitter: isURL,
    discord: isURL
});

export {
    profileValidate
};