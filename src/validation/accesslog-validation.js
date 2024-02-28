import Joi from 'joi';

export const accessLogValidation = Joi.object({
    session: Joi.string().min(6).max(50).trim().required(),
    ip: Joi.string().min(6).max(50).trim().required(),
    path: Joi.string().min(1).max(100).trim().required(),
    user_agent: Joi.string().min(1).max(255).trim().required(),
    country: Joi.string().min(1).max(100).trim(),
    countryCode: Joi.string().min(1).max(100).trim(),
    city: Joi.string().min(1).max(100).trim(),
    lat: Joi.number(),
    lon: Joi.number(),
    isMobile: Joi.boolean().required(),
    isDesktop: Joi.boolean().required(),
    isWindows: Joi.boolean().required(),
    isMacOS: Joi.boolean().required(),
    isAndroid: Joi.boolean().required(),
    isIos: Joi.boolean().required(),
    isFirefox: Joi.boolean().required(),
    isEdge: Joi.boolean().required(),
    isChrome: Joi.boolean().required(),
    isSafari: Joi.boolean().required()
});