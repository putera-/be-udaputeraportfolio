import { prismaClinet } from "../application/database.js";
// import { ResponseError } from "../error/response-error";
// import { userValidation } from "../validation/user-validation"
// import { validate } from "../validation/validation"
// import bcrypt from '@types/bcrypt'

const get = async (request) => {
    return prismaClinet.profile.findFirst();
}

export default {
    get
}