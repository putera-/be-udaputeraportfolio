import Joi from 'joi';
import { isString, isText } from './all-validation.js';

const blogValidation = Joi.object({
    title: isString.required(),
    content: isText.required(),
    photos: Joi.array().items(Joi.object({
        id: Joi.number(),
        index: Joi.number()
    })).label('Photos')
});

const blogFilters = Joi.object({
    title: Joi.string().trim().lowercase().allow(null, '').label('Title'),
    content: Joi.string().trim().lowercase().allow(null, '').label('Content'),
    page: Joi.number().positive().required().label('Page'),
    limit: Joi.number().positive().required().label('Limit')
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