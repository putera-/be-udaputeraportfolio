import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { isID } from '../validation/all-validation.js';
import { educationValidation } from '../validation/education-validation.js';
import { validate } from '../validation/validation.js';

const getAll = async () => {
    const data = await prismaClient.education.findMany({
        orderBy: [{
            startYear: 'desc'
        }]
    });

    for (const education of data) {
        formatData(education);
    }

    return data;
};

const get = async (id) => {
    id = validate(isID, id);

    const education = await prismaClient.education.findUnique({
        where: { id },
    });

    if (!education) throw new ResponseError(404, 'Education not found!');

    return education;
};

const create = async (data) => {
    data = validate(educationValidation, data);

    return prismaClient.education.create({ data });
};

const update = async (id, data) => {
    id = validate(isID, id);
    data = validate(educationValidation, data);

    const education = await prismaClient.education.findUnique({
        where: { id },
        select: { id: true }
    });

    if (!education) throw new ResponseError(404, 'Education not found!');

    return prismaClient.education.update({
        where: { id },
        data: data
    });

};

const remove = async (id) => {
    id = validate(isID, id);

    const education = await prismaClient.education.findUnique({
        where: { id },
        select: { id: true }
    });

    if (!education) throw new ResponseError(404, 'Education not found!');

    return prismaClient.education.delete({ where: { id } });
};

const formatData = (data) => {
    data.endYear = data.endYear || 'Present';
};

export default {
    getAll,
    get,
    create,
    update,
    remove
};