import Joi from "joi";
import { isString, isText } from "./all-validation.js";


const blogValidation = Joi.object({
    title: isString,
    content: isText.required()
})

export {
    blogValidation
}