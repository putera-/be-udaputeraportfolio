import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { isEmail } from "../validation/all-validation.js";
import { updateUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from 'bcrypt';

const get = async (email) => {
    email = validate(isEmail, email);

    const user = await prismaClient.user.findUnique({
        where: { email },
        select: {
            name: true,
            email: true
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return user;
};

const update = async (email, request) => {
    const { name, password } = validate(updateUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: { email }
    });

    if (!countUser) {
        throw new ResponseError(404, "User nor found");
    }

    const data = { name };
    if (password) {
        data.password = await bcrypt.hash(password, 10);
    }

    return prismaClient.user.update({
        where: { email },
        data,
        select: {
            name: true,
            email: true
        }
    });
};

export default {
    get,
    update
};