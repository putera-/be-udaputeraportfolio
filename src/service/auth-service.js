import { prismaClinet } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { authValidation } from "../validation/auth-validation.js";
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;
const maxAge = 24 * 60 * 60;

const login = async (request, res) => {
    const loginRequest = validate(authValidation, request);

    const user = await prismaClinet.user.findUnique({
        where: {
            email: loginRequest.email
        },
        select: {
            name: true,
            email: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "Invalid Credential")
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Invalid Credential")
    }

    // creat token
    const token = create_token(user.email);

    // save token to cookie
    set_cookie(res, token);

    // this will return user data
    return save_token(loginRequest.email, token);
}

const create_token = (email) => {
    const token = jwt.sign({ email: email },
        jwtSecret,
        { expiresIn: maxAge });

    return token;
}

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
}

const save_token = async (email, token) => {
    return await prismaClinet.user.update({
        data: {
            token: token
        },
        where: {
            email: email
        },
        select: {
            name: true,
            email: true,
            token: true
        }
    });
}

const set_cookie = (res, token) => {
    // save token to cookie
    // expire 1 day
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: maxAge * 1000
    });
}

export default {
    login,
    set_cookie,
    verify_token
}