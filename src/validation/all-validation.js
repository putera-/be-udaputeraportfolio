import Joi from "joi"

const istruthy = Joi.boolean().truthy();
const isID = Joi.number().positive().required();
const isEmail = Joi.string().email().max(100).trim().required();
const isString = Joi.string().min(3).max(100).trim().required();

export {
    istruthy,
    isID,
    isEmail,
    isString
}