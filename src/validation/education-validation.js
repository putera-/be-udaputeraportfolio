import Joi from 'joi';

const maxYear = new Date().getFullYear();
const educationValidation = Joi.object({
    institutionName: Joi.string().min(3).max(100).trim().required(),
    startYear: Joi.number().max(maxYear).positive().required(),
    endYear: Joi.number().max(maxYear).positive(),
    major: Joi.string().min(3).max(100).trim(),
    degree: Joi.string().min(3).max(100).trim()
});

export {
    educationValidation
};