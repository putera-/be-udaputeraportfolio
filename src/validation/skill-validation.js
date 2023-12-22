import Joi from "joi";
import { isID } from "./all-validation.js";

const skillTitleValidation = Joi.string().min(3).max(100).trim().required();
const skillCategoryValidation = Joi.string().min(3).max(100).trim().uppercase().required();

const skillValidation = Joi.object({
    title: skillTitleValidation,
    category: skillCategoryValidation
})

export {
    skillValidation,
    skillTitleValidation,
    skillCategoryValidation
}