import { logger } from "../application/logging.js";
import { ResponseError } from "../error/response-error.js";
import Joi from "joi";

const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        return next();
    }

    logger.error(err);
    if (err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message
        }).end();
    } else if (err instanceof Joi.ValidationError) {
        res.status(400).json({
            errors: err.message
        }).end();
    } else {
        res.status(500).json({
            errors: "Internal server Error",
            message: err.message
        });
    }
};

export {
    errorMiddleware
};