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

const update = async (oldemail, request, res) => {
    const { name, email, password } = validate(updateUserValidation, request);

    await prismaClient.user.findFirstOrThrow();

    const data = { name, email };
    if (password) {
        data.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prismaClient.user.update({
        where: { email: oldemail },
        data,
        select: {
            name: true,
            email: true
        }
    });

    // creat token
    const token = authService.create_token(email);

    // save token to cookie
    authService.set_cookie(res, token);

    return updatedUser;
};

export default {
    get,
    update
};