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


const projectFilters = Joi.object({
    title: Joi.string().trim().lowercase().allow(null),
    description: Joi.string().trim().lowercase().allow(null),
    company: Joi.string().trim().lowercase().allow(null),
    page: Joi.number().positive().required(),
    perPage: Joi.number().positive().required()
}).when(
    Joi.object({
        title: Joi.valid(null)
    }).unknown(),
    {
        then: Joi.object({
            title: Joi.strip()
        })
    }
).when(
    Joi.object({
        description: Joi.valid(null)
    }).unknown(),
    {
        then: Joi.object({
            description: Joi.strip()
        })
    }
).when(
    Joi.object({
        company: Joi.valid(null)
    }).unknown(),
    {
        then: Joi.object({
            company: Joi.strip()
        })
    }
);

export {
    projectValidation,
    projectFilters
};