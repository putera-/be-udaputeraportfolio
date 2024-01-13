import Joi from 'joi';

const experienceValidation = Joi.object({
    company: Joi.string().min(3).max(100).trim().required(),
    location: Joi.string().min(3).max(100).trim().required(),
    title: Joi.string().min(3).max(100).trim().required(),
    description: Joi.string().min(3).trim().required(),
    startDate: Joi.date().max('now').required(),
    endDate: Joi.date().min(Joi.ref('startDate')).max('now')
});

export {
    experienceValidation
};