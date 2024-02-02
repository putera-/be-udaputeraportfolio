import Joi from 'joi';
import { isEmail, isString, isText, isURL } from './all-validation.js';

const phoneRegex = /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;
const profileValidate = Joi.object({
    firstname: isString.label("First name"),
    lastname: isString.label("Last name"),
    job: isString.label("Job"),
    email: isEmail.label("Email"),
    phone: Joi.string().regex(phoneRegex).required().label('Phone Number'),
    dob: Joi.date().required().label("Date of birth"),
    address: isText.label("Address"),
    city: isString.label("City"),
    country: isString.label("Country"),
    avatar: Joi.string().allow(null, "").label("Avatar"),
    avatar_md: Joi.string().allow(null, ""),
    avatar_sm: Joi.string().allow(null, ""),
    bio: isText.allow(null, "").label("Bio"),
    web: isURL.allow(null, "").label("Web"),
    github: isURL.allow(null, "").label("Github"),
    gitlab: isURL.allow(null, "").label("Gitlab"),
    linkedin: isURL.allow(null, "").label("Linkedin"),
    instagram: isURL.allow(null, "").label("Instagram"),
    facebook: isURL.allow(null, "").label("Facebook"),
    twitter: isURL.allow(null, "").label("Twitter"),
    discord: isURL.allow(null, "").label("Discord")
});

export {
    profileValidate
};