import moment from 'moment';
import { prismaClient } from '../application/database.js';
import { isID } from '../validation/all-validation.js';
import { projectValidation } from '../validation/project-validation.js';
import { validate } from '../validation/validation.js';
import dateService from './date-service.js';
import { ResponseError } from '../error/response-error.js';

const getAll = async () => {
    const projects = await prismaClient.project.findMany();

    for (let i = 0; i < projects.length; i++) {
        projects[i] = formatData(projects[i]);
    }

    return projects;
};

const get = async (id) => {
    id = validate(isID, id);

    const project = await prismaClient.project.findUnique({
        where: { id }
    });

    if (!project) throw new ResponseError(404, 'Project not found!');

    return formatData(project);
};

const create = async (data) => {
    data = validate(projectValidation, data);

    data.startDate = dateService.toLocaleDate(data.startDate);
    if (data.endDate) data.endDate = dateService.toLocaleDate(data.endDate);

    const project = await prismaClient.project.create({ data });

    return formatData(project);
};

const update = async (id, data) => {
    id = validate(isID, id);
    data = validate(projectValidation, data);

    data.startDate = dateService.toLocaleDate(data.startDate);
    if (data.endDate) data.endDate = dateService.toLocaleDate(data.endDate);

    const findProject = await prismaClient.project.findUnique({
        where: { id },
        select: { id: true }
    });

    if (!findProject) throw new ResponseError(404, 'Project not found!');

    const project = await prismaClient.project.update({
        where: { id },
        data
    });

    return formatData(project);
};

const remove = async (id) => {
    id = validate(isID, id);

    const project = await prismaClient.project.findUnique({
        where: { id },
        select: { id: true }
    });

    if (!project) throw new ResponseError(404, 'Project not found!');

    return prismaClient.project.delete({
        where: { id }
    });
};

const formatData = (project) => {
    // format date
    project.startDate = moment(project.startDate).format('YYYY-MM-DD');
    if (project.endDate) project.endDate = moment(project.endDate).format('YYYY-MM-DD');

    // status
    project.status = project.status.replace('_', ' ');

    return project;
};

export default {
    getAll,
    get,
    create,
    update,
    remove
};
