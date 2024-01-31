import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { isEmail } from '../validation/all-validation.js';
import { authValidation } from '../validation/auth-validation.js';
import { validate } from '../validation/validation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;
const maxAge = 24 * 60 * 60;

const login = async (request, res) => {
    const { email, password } = validate(authValidation, request);

    const user = await prismaClient.user.findUnique({
        where: { email },
        select: {
            name: true,
            email: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, 'Invalid Credential');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, 'Invalid Credential');
    }

    // creat token
    const token = create_token(email);

    // save token to cookie
    set_cookie(res, token);

    // this will return user data
    return save_token(email, token);
};

const logout = async (email) => {
    email = validate(isEmail, email);

    const user = await prismaClient.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new ResponseError(404, 'User not found');
    }

    return prismaClient.user.update({
        where: { email },
        data: {
            token: null
        },
        select: {
            email: true
        }
    });
};

const create_token = (email, age) => {
    // if age is undefined, then use default age
    age = age ? age : maxAge;

    // TODO make stronger token, example add timestamp
    const token = jwt.sign({ email: email },
        jwtSecret,
        { expiresIn: maxAge });

    return token;
};

const verify_token = (res, token) => {
    try {
        const { email } = jwt.verify(token, jwtSecret);

        // generate new token
        const newToken = create_token(email);

        // update token to database
        save_token(email, newToken);
        // update token to cookie
        set_cookie(res, newToken);

        return newToken;
    } catch (error) {
        return false;
    }
};

const save_token = async (email, token) => {
    return await prismaClient.user.update({
        data: { token },
        where: { email },
        select: {
            name: true,
            email: true,
            // token: true
        }
    });
};

const set_cookie = (res, token) => {
    // save token to cookie
    // expire 1 day
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
        sameSite: 'None',
        secure: true,
        domain: process.env.COOKIE_DOMAIN
    });
};

const get_user_by_token = (req) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const { email } = jwt.verify(token, jwtSecret);
            return email;
        } catch (error) { }
    }

    return '-';
};

export default {
    login,
    logout,
    set_cookie,
    verify_token,
    create_token,
    get_user_by_token
};