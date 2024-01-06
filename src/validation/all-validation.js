import Joi from "joi"

const istruthy = Joi.boolean().truthy();
const isID = Joi.number().positive().required();
const isEmail = Joi.string().email().max(100).trim().required();
const isPassword = Joi.string().min(6).max(100).trim();
const isString = Joi.string().min(3).max(100).trim().required();
const isText = Joi.string().trim().min(3);
const isURL = Joi.string().trim().uri();

export {
    istruthy,
    isID,
    isEmail,
    isString,
    isPassword,
    isText,
    isURL
}