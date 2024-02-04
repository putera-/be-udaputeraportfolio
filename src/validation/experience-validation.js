import Joi from 'joi';

const experienceValidation = Joi.object({
    company: Joi.string().min(3).max(100).trim().required(),
    location: Joi.string().min(3).max(100).trim().required(),
    title: Joi.string().min(3).max(100).trim().required(),
    description: Joi.string().min(3).trim().required(),
    startDate: Joi.date().max('now').required(),
    endDate: Joi.date().min(Joi.ref('startDate')).max('now').allow(null, "")
});

const experienceFilters = Joi.object({
    title: Joi.string().trim().lowercase().allow(null),
    description: Joi.string().trim().lowercase().allow(null),
    company: Joi.string().trim().lowercase().allow(null),
    description: Joi.string().trim().lowercase().allow(null),
    page: Joi.number().positive().required(),
    limit: Joi.number().positive().required()
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