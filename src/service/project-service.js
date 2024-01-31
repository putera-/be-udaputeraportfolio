import moment from 'moment';
import { prismaClient } from '../application/database.js';
import { isID } from '../validation/all-validation.js';
import { projectFilters, projectValidation } from '../validation/project-validation.js';
import { validate } from '../validation/validation.js';
import dateService from './date-service.js';
import { ResponseError } from '../error/response-error.js';
import fileService from './file-service.js';

const getAll = async (filters) => {
    filters = validate(projectFilters, filters);

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

    // skip based on page & perPage
    // (page - 1) * perPage
    const page = filters.page;
    const perPage = filters.perPage;
    const skip = (page - 1) * perPage;

    const params = {
        take: perPage,
        skip: skip
    };
    if (dbFilters.length) params.where = dbFilters;

    const projects = await prismaClient.project.findMany({
        ...params,
        include: {
            photos: {
                orderBy: { index: 'asc' }
            },
            skills: {
                include: {
                    skill: {
                        select: { title: true }
                    }
                }
            }
        }
    });

    const params2 = {};
    if (dbFilters.length) params2.where = dbFilters;
    const totalProjects = await prismaClient.project.count(params2);

    for (let project of projects) {
        project = formatData(project);
    }

    return {
        data: projects,
        page,
        total: projects.length,
        total_data: totalProjects,
        total_page: Math.ceil(totalProjects / perPage)
    };
};

const get = async (id) => {
    id = validate(isID, id);

    const project = await prismaClient.project.findUnique({
        where: { id },
        include: {
            photos: {
                orderBy: {
                    index: 'asc'
                }
            },
            skills: {
                include: {
                    skill: true
                }
            },
        }
    });

    return formatData(project);
};

const create = async (data, photos) => {
    data = validate(projectValidation, data);
    console.log(data);

    data.startDate = dateService.toLocaleDate(data.startDate);
    if (data.endDate) data.endDate = dateService.toLocaleDate(data.endDate);

    // remove skills array
    const skills = data.skills.map(s => { return { skillId: s } });
    delete data.skills;

    const project = await prismaClient.project.create({
        data: {
            ...data,
            photos: {
                create: photos
            },
            skills: {
                createMany: {
                    data: skills
                }
            }
        },
        include: {
            photos: {
                orderBy: {
                    index: 'asc'
                }
            },
            skills: {
                include: {
                    skill: true
                }
            },
        }
    });

    return formatData(project);
};

const update = async (id, data, newPhotos) => {
    id = validate(isID, id);
    data = validate(projectValidation, data);

    data.startDate = dateService.toLocaleDate(data.startDate);
    if (data.endDate) data.endDate = dateService.toLocaleDate(data.endDate);

    // also get current photos before update
    const findProject = await prismaClient.project.findUnique({
        where: { id },
        include: { photos: true }
    });

    if (!findProject) throw new ResponseError(404, 'Project not found!');

    // remove skills array
    const skills = data.skills.map(s => { return { skillId: s } });
    delete data.skills;

    // data photos
    // create empty data if null
    if (!data.photos) data.photos = [];

    // collect data photos to update
    const photosUpdate = data.photos.map(p => ({
        where: { id: p.id },
        data: { index: p.index }
    }));

    const keepedIds = data.photos.map(p => p.id);
    const keepedIndexes = data.photos.map(p => p.index);

    // get taken index
    const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // get available index
    const availableIndexes = indexes.filter(i => !keepedIndexes.includes(i));

    // update new photo indexes
    newPhotos = newPhotos.map(p => {
        p.index = availableIndexes[0];
        availableIndexes.shift();
        return p;
    });

    // remove photos from project data
    delete data.photos;

    // update, then delete, then create
    const project = await prismaClient.project.update({
        where: { id },
        data: {
            ...data,
            photos: {
                update: photosUpdate,
                deleteMany: {
                    id: {
                        notIn: keepedIds
                    }
                },
                create: newPhotos
            },
            skills: {
                deleteMany: {},
                createMany: {
                    data: skills
                }
            }
        },
        include: {
            skills: true,
            photos: {
                orderBy: {
                    index: 'asc'
                }
            }
        }
    });

    // collect unused photo
    const photo_to_delete = findProject.photos.filter(p => !keepedIds.includes(p.id));

    // deleted unused photo files
    removePhotos(photo_to_delete);

    return formatData(project);
};

const remove = async (id) => {
    id = validate(isID, id);

    const project = await prismaClient.project.findUnique({
        where: { id },
        include: { photos: true }
    });

    if (!project) throw new ResponseError(404, 'Project not found!');

    // remove photo files
    removePhotos(project.photos);

    return prismaClient.project.delete({
        where: { id }
    });
};

const formatData = (project) => {
    // format date
    project.startDate = moment(project.startDate).format('YYYY-MM-DD');
    project.readStartDate = moment(project.startDate).format('D MMM YYYY');
    if (project.endDate) {
        project.endDate = moment(project.endDate).format('YYYY-MM-DD');
        project.readEndDate = moment(project.endDate).format('D MMM YYYY');
    } else {
        project.readEndDate = 'Present';
    }

    // status
    project.status = project.status.replace('_', ' ');

    // skills
    project.skills = project.skills.map(ps => ps.skill);

    return project;
};

const removePhotos = (photos) => {
    for (const photo of photos) {
        fileService.removeFile(photo.path);
        fileService.removeFile(photo.path_md);
        fileService.removeFile(photo.path_sm);
    }
};

export default {
    getAll,
    get,
    create,
    update,
    remove
};
