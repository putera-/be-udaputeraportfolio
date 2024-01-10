import Joi from 'joi';
import { isString, isText } from './all-validation.js';


const blogValidation = Joi.object({
    title: isString,
    content: isText.required()
});

const blogFilters = Joi.object({
    title: Joi.string().trim().lowercase().allow(null),
    content: Joi.string().trim().lowercase().allow(null),
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
        content: Joi.valid(null)
    }).unknown(),
    {
        then: Joi.object({
            content: Joi.strip()
        })
    }
);

export {
    blogValidation,
    blogFilters
};