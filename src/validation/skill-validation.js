import Joi from "joi";

const skillIdValidation = Joi.number().positive().required();
const skillTitleValidation = Joi.string().min(3).max(100).trim().required();
const skillCategoryValidation = Joi.string().min(3).max(100).trim().uppercase().required();

const skillValidation = Joi.object({
    id: skillIdValidation,
    title: skillTitleValidation,
    category: skillCategoryValidation
})

export {
    skillValidation,
    skillIdValidation,
    skillTitleValidation,
    skillCategoryValidation
}