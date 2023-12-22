import { prismaClinet } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { isID } from "../validation/all-validation.js";
import { educationValidation } from "../validation/education-validation.js"
import { validate } from "../validation/validation.js"

const getAll = async () => {
    return prismaClinet.education.findMany({
        select: {
            id: true,
            institutionName: true,
            startYear: true,
            endYear: true,
            major: true,
            degree: true,
        }
    });
}

const get = async (id) => {
    id = validate(isID, id);

    const education = await prismaClinet.education.findUnique({
        where: { id },
        select: {
            id: true,
            institutionName: true,
            startYear: true,
            endYear: true,
            major: true,
            degree: true,
        }
    })

    if (!education) throw new ResponseError(404, "Education not found!");

    return education;
}

const create = async (data) => {
    const education = validate(educationValidation, data);

    return prismaClinet.education.create({
        data: education,
        select: {
            id: true,
            institutionName: true,
            startYear: true,
            endYear: true,
            major: true,
            degree: true,
        }
    });
}

const update = async (id, data) => {
    id = validate(isID, id);
    data = validate(educationValidation, data);

    const education = await prismaClinet.education.findUnique({
        where: { id },
        select: { id: true }
    });

    if (!education) throw new ResponseError(404, "Education not found!");

    return prismaClinet.education.update({
        where: { id },
        data: data,
        select: {
            id: true,
            institutionName: true,
            startYear: true,
            endYear: true,
            major: true,
            degree: true
        }
    })

}

const remove = async (id) => {
    id = validate(isID, id);

    const education = await prismaClinet.education.findUnique({
        where: { id },
        select: { id: true }
    })

    if (!education) throw new ResponseError(404, "Education not found!");

    return prismaClinet.education.delete({ where: { id } });
}

export default {
    getAll,
    get,
    create,
    update,
    remove
}