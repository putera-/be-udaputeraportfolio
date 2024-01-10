import Joi from 'joi';
import { isString, isText, isURL } from './all-validation.js';

const projectValidation = Joi.object({
    title: isString,
    description: isText.required(),
    url: isURL,
    github: isURL,
    gitlab: isURL,
    startDate: Joi.date().max('now').required(),
    endDate: Joi.date().min(Joi.ref('startDate')).max('now'),
    status: Joi.string().uppercase().valid('ON_PROGRESS', 'COMPLETE', 'MAINTENANCE'),
    company: Joi.string().min(3).max(100).trim()
});

export {
    projectValidation
};