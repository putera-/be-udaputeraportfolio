import Joi from "joi";

const skillIdValidation = Joi.number().positive().required();
const skillValidation = Joi.string().min(3).max(100).trim().required();
const skillCategoryValidation = Joi.string().min(3).max(100).trim().uppercase().required();

export {
    skillIdValidation,
    skillValidation,
    skillCategoryValidation
}