import dayjs from 'dayjs';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { isID } from '../validation/all-validation.js';
import { experienceFilters, experienceValidation } from '../validation/experience-validation.js';
import { validate } from '../validation/validation.js';

const getAll = async (filters) => {
    filters = validate(experienceFilters, filters);
    // filters
    const dbFilters = [];
    if (filters.title) {
        dbFilters.push({
            title: { contains: filters.title }
        });
    }
    if (filters.description) {
        dbFilters.push({
            description: { contains: filters.description }
        });
    }
    if (filters.company) {
        dbFilters.push({
            company: { contains: filters.company }
        });
    }

    // skip based on page & limit
    // (page - 1) * limit
    const page = filters.page;
    const limit = filters.limit;
    const skip = (page - 1) * limit;

    const params = {
        take: limit,
        skip: skip,
        orderBy: [{
            startDate: 'desc'
        }]
    };
    if (dbFilters.length) params.where = {
        OR: dbFilters
    };

    const experiences = await prismaClient.experience.findMany(params);

    const params2 = {};
    if (Object.keys(dbFilters).length) params2.where = {
        OR: dbFilters
    };
    const totalExperiences = await prismaClient.experience.count(params2);

    // forma data
    for (let experience of experiences) {
        experience = formatData(experience);
    }

    return {
        data: experiences,
        page,
        total: experiences.length,
        total_data: totalExperiences,
        total_page: Math.ceil(totalExperiences / limit)
    };
};

const get = async (id) => {
    id = validate(isID, id);

    const experience = await prismaClient.experience.findUnique({
        where: { id },
    });

    if (!experience) throw new ResponseError(404, 'Experience not found!');

    return formatData(experience);
};

const create = async (data) => {
    data = validate(experienceValidation, data);

    const experience = await prismaClient.experience.create({ data });
    return formatData(experience);
};

const update = async (id, data) => {
    id = validate(isID, id);
    data = validate(experienceValidation, data);

    const experience = await prismaClient.experience.findUnique({
        where: { id },
        select: { id: true }
    });

    if (!experience) throw new ResponseError(404, 'Experience not found!');

    const updatedData = await prismaClient.experience.update({
        where: { id },
        data: data
    });

    return formatData(updatedData);
};

const remove = async (id) => {
    id = validate(isID, id);

    const experience = await prismaClient.experience.findUnique({
        where: { id },
        select: { id: true }
    });

    if (!experience) throw new ResponseError(404, 'Experience not found!');

    return prismaClient.experience.delete({ where: { id } });
};

const formatData = (experience) => {
    experience.startDate = dayjs(experience.startDate).format('YYYY-MM-DD');
    experience.readStartDate = dayjs(experience.startDate).format('D MMM YYYY');
    if (experience.endDate) {
        experience.endDate = dayjs(experience.endDate).format('YYYY-MM-DD');
        experience.readEndDate = dayjs(experience.endDate).format('D MMM YYYY');
    } else {
        experience.readEndDate = 'Present'
    }

    return experience;
};

export default {
    getAll,
    get,
    create,
    update,
    remove
};