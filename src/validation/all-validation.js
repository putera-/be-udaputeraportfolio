import Joi from "joi"

const istruthy = Joi.boolean().truthy();
const isID = Joi.number().positive().required();

export {
    istruthy,
    isID
}