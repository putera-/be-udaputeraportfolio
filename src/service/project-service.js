import moment from 'moment';
import { prismaClient } from '../application/database.js';
import { isID } from '../validation/all-validation.js';
import { projectFilters, projectValidation } from '../validation/project-validation.js';
import { validate } from '../validation/validation.js';
import dateService from './date-service.js';
import { ResponseError } from '../error/response-error.js';

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
    }
    if (dbFilters.length) params.where = dbFilters;

    const projects = await prismaClient.project.findMany({
        ...params,
        include: {
            ProjectSkills: {
                include: {
                    skill: {
                        select: { title: true }
                    }
                }
            }
        }
    });

    const params2 = {}
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
            ProjectSkills: true
        }
    });

    if (!project) throw new ResponseError(404, 'Project not found!');
    const skills = project.ProjectSkills.map(s => s.skillId);
    const skillCats = await prismaClient.skillCategory.findMany({
        where: {
            skills: {
                some: {
                    id: { in: skills }
                }
            }
        },
        include: {
            skills: {
                where: {
                    id: { in: skills }
                }
            }
        }
    });
    project.skills = skillCats;

    return formatData(project);
};

const create = async (data) => {
    data = validate(projectValidation, data);

    data.startDate = dateService.toLocaleDate(data.startDate);
    if (data.endDate) data.endDate = dateService.toLocaleDate(data.endDate);

    // remove skills array
    const skills = data.skills;
    delete data.skills;

    const project = await prismaClient.project.create({ data });

    // update skills relation
    await addSkills(project.id, skills)

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

    // remove skills array
    const skills = data.skills
    delete data.skills;

    const project = await prismaClient.project.update({
        where: { id },
        data
    });

    // update skills relation
    await addSkills(id, skills)

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
    project.readStartDate = moment(project.startDate).format('D MMM YYYY');
    if (project.endDate) {
        project.endDate = moment(project.endDate).format('YYYY-MM-DD');
        project.readEndDate = moment(project.endDate).format('D MMM YYYY');
    }

    // status
    project.status = project.status.replace('_', ' ');

    return project;
};

const addSkills = async (projectId, skills) => {
    // remove current projectSkills
    await prismaClient.projectSkills.deleteMany({
        where: { projectId }
    });

    const projectSkills = [];
    for (const skill of skills) {
        projectSkills.push({
            projectId: projectId,
            skillId: skill
        });
    }
    if (projectSkills.length) {
        await prismaClient.projectSkills.createMany({
            data: projectSkills
        });
    }
}

export default {
    getAll,
    get,
    create,
    update,
    remove
};
