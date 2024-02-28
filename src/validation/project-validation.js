import Joi from 'joi';
import dayjs from 'dayjs';
import { isString, isText, isURL } from './all-validation.js';

const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
const projectValidation = Joi.object({
    title: isString.label('Project Title'),
    description: isText.required().label('Description'),
    url: isURL.allow(null, '').label('URL'),
    github: isURL.allow(null, '').label('Github'),
    gitlab: isURL.allow(null, '').label('Gitlab'),
    startDate: Joi.date().max(tomorrow).required().label('Start Date'),
    endDate: Joi.date().min(Joi.ref('startDate')).max(tomorrow).allow(null).label('End Date'),
    status: Joi.string().uppercase().valid('ON_PROGRESS', 'COMPLETE', 'MAINTENANCE').label('Status'),
    company: Joi.string().min(3).max(100).trim().allow(null, '').label('Company'),
    skills: Joi.array().items(Joi.number().positive()).unique().label('Skills').label('Skills'),
    photos: Joi.array().items(Joi.object({
        id: Joi.string(),
        index: Joi.number()
    })).label('Photos')
});


const projectFilters = Joi.object({
    title: Joi.string().trim().lowercase().allow(null, '').label('Project Title'),
    description: Joi.string().trim().lowercase().allow(null, '').label('Description'),
    company: Joi.string().trim().lowercase().allow(null, '').label('Company'),
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