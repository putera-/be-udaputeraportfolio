import Joi from 'joi';
import { isEmail, isString, isText, isURL } from './all-validation.js';

const phoneRegex = /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;
const profileValidate = Joi.object({
    firstname: isString,
    lastname: isString,
    job: isString,
    email: isEmail,
    phone: Joi.string().regex(phoneRegex).required().label('Phone Number'),
    dob: Joi.date().required(),
    address: isText,
    city: isString,
    country: isString,
    avatar: Joi.string().allow(null, ""),
    avatar_md: Joi.string().allow(null, ""),
    avatar_sm: Joi.string().allow(null, ""),
    bio: isText.allow(null, ""),
    web: isURL.allow(null, ""),
    github: isURL.allow(null, ""),
    gitlab: isURL.allow(null, ""),
    linkedin: isURL.allow(null, ""),
    instagram: isURL.allow(null, ""),
    facebook: isURL.allow(null, ""),
    twitter: isURL.allow(null, ""),
    discord: isURL.allow(null, "")
});

export {
    profileValidate
};