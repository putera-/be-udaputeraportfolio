import Joi from "joi";
import { isString, isText, isURL } from "./all-validation.js";

const projectValidation = Joi.object({
    title: isString,
    description: isText,
    url: isURL,
    github: isURL,
    gitlab: isURL,
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')),
    status: Joi.string().uppercase().required()
});

export {
    projectValidation
}