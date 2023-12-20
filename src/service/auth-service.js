import { prismaClinet } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { authValidation } from "../validation/auth-validation.js";
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const login = async (request) => {
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

    const isPasswordValid = bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Invalid Credential")
    }

    const token = uuid().toString();
    return prismaClinet.user.update({
        data: {
            token: token
        },
        where: {
            email: loginRequest.email
        },
        select: {
            name: true,
            email: true,
            token: true
        }
    })
}

export default { login }