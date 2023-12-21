import { prismaClinet } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getUserValidation, updateUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from 'bcrypt'

const get = async (email) => {
    const checkEmail = validate(getUserValidation, email);

    const user = await prismaClinet.user.findUnique({
        where: {
            email: checkEmail
        },
        select: {
            name: true,
            email: true
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found")
    }

    return user;
}

const update = async (email, request) => {
    const user = validate(updateUserValidation, request);

    const countUser = await prismaClinet.user.count({
        where: {
            email: email
        }
    });

    if (!countUser) {
        throw new ResponseError(404, "User nor found")
    }

    let data_update = {
        name: user.name
    };

    if (user.password) {
        data_update.password = await bcrypt.hash(user.password, 10);
    }

    return prismaClinet.user.update({
        where: {
            email: email
        },
        data: data_update,
        select: {
            name: true,
            email: true
        }
    });
}

export default {
    get,
    update
}