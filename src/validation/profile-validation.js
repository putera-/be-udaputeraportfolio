import Joi from "joi";
import { isEmail, isString } from "./all-validation.js";

const profileValidate = Joi.object({
    firstname: isString,
    lastname: isString,
    email: isEmail,

});

export {
    profileValidate
}