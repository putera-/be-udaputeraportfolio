import Joi from 'joi';
import { isString } from './all-validation.js';

const skillCategoryValidation = Joi.string().min(3).max(100).trim().uppercase().required();

const skillValidation = Joi.object({
    title: isString,
    svg: Joi.string().trim().allow(null, ""),
    category: skillCategoryValidation
});

export {
    skillValidation,
    skillCategoryValidation
};