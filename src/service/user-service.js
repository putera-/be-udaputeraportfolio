import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { isEmail } from '../validation/all-validation.js';
import { updateUserValidation } from '../validation/user-validation.js';
import { validate } from '../validation/validation.js';
import authService from '../service/auth-service.js';
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
        throw new ResponseError(404, 'user is not found');
    }

    return user;
};

const update = async (email, request, res) => {
    // const { name, email, password } = validate(updateUserValidation, request);
    const data = validate(updateUserValidation, request);

    const currentData = await prismaClient.user.findFirstOrThrow();

    // const data = { name, email };
    if (data.password) {
        // data.old_password
        data.password = await bcrypt.hash(data.password, 10);
        const isPasswordValid = await bcrypt.compare(data.old_password, currentData.password);
        if (!isPasswordValid) {
            throw new ResponseError(400, 'Old Password is invalid');
        }

        delete data.old_password;
        delete data.password_confirm;
    }

    const updatedUser = await prismaClient.user.update({
        where: { email: email },
        data,
        select: {
            name: true,
            email: true
        }
    });

    if (data.email) {
        // creat token
        const token = authService.create_token(data.email);

        // save token to cookie
        authService.set_cookie(res, token);
    }


    return updatedUser;
};

export default {
    get,
    update
};