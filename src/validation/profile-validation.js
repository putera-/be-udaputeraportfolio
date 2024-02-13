import Joi from 'joi';
import { isEmail, isString, isText, isURL } from './all-validation.js';

const phoneRegex = /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;

const profileValidate = {
    avatar: isText.allow(null, "").label("Avatar"),
    avatar_md: isText.allow(null, ""),
    avatar_sm: isText.allow(null, ""),
    bio: isText.allow(null, "").label("Bio"),
    web: isURL.allow(null, "").label("Web"),
    github: isURL.allow(null, "").label("Github"),
    gitlab: isURL.allow(null, "").label("Gitlab"),
    linkedin: isURL.allow(null, "").label("Linkedin"),
    instagram: isURL.allow(null, "").label("Instagram"),
    facebook: isURL.allow(null, "").label("Facebook"),
    twitter: isURL.allow(null, "").label("Twitter"),
    discord: isURL.allow(null, "").label("Discord")
};

// with required
const profileCreateValidation = Joi.object({
    firstname: isString.required().label("First name"),
    lastname: isString.required().label("Last name"),
    job: isString.required().label("Job"),
    email: isEmail.required().label("Email"),
    phone: isText.regex(phoneRegex).required().label('Phone Number'),
    dob: Joi.date().required().label("Date of birth"),
    address: isText.required().label("Address"),
    city: isString.required().label("City"),
    country: isString.required().label("Country"),
    ...profileValidate,
});

// without required
const profileUpdateValidation = Joi.object({
    firstname: isString.label("First name"),
    lastname: isString.label("Last name"),
    job: isString.label("Job"),
    email: isEmail.label("Email"),
    phone: isText.regex(phoneRegex).label('Phone Number'),
    dob: Joi.date().label("Date of birth"),
    address: isText.label("Address"),
    city: isString.label("City"),
    country: isString.label("Country"),
    ...profileValidate,
});

export {
    profileCreateValidation,
    profileUpdateValidation
};