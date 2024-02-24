import Joi from 'joi';
import dayjs from 'dayjs';

const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
const experienceValidation = Joi.object({
    company: Joi.string().min(3).max(100).trim().required().label('Company'),
    location: Joi.string().min(3).max(100).trim().required().label('Location'),
    title: Joi.string().min(3).max(100).trim().required().label('Title'),
    description: Joi.string().min(3).trim().required().label('Description'),
    startDate: Joi.date().max(tomorrow).required().label('Start Date'),
    endDate: Joi.date().min(Joi.ref('startDate')).max(tomorrow).allow(null, '').label('End Date')
});

const experienceFilters = Joi.object({
    title: Joi.string().trim().lowercase().allow(null, '').label('Title'),
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
    experienceValidation,
    experienceFilters
};