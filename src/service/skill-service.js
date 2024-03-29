import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { isID, isString, istruthy } from '../validation/all-validation.js';
import { skillCategoryValidation, skillValidation } from '../validation/skill-validation.js';
import { validate } from '../validation/validation.js';

const getAll = async (req) => {
    const category = validate(istruthy, req.query.category);

    const skills = await prismaClient.skill.findMany({
        orderBy: { title: 'asc' },
        include: {
            category,
            _count: {
                select: { projects: true }
            }
        }
    });

    for (const skill of skills) {
        skill.projects_count = skill._count.projects;
        delete skill._count;
    }

    return skills;
};

const getByCategory = () => {
    return prismaClient.skillCategory.findMany({
        include: {
            skills: {
                orderBy: {
                    title: 'asc'
                }
            }
        },
        orderBy: {
            title: 'asc'
        }
    });
};

const get = async (id) => {
    id = validate(isID, id);

    const skill = await prismaClient.skill.findUnique({
        where: { id },
        include: { category: true }
    });

    if (!skill) throw new ResponseError(404, 'Skill not found!');

    return skill;
};

const create = async (data) => {
    data = validate(skillValidation, data);

    // find or create category
    const { id: categoryId } = await find_or_create_category(data.category);

    // update data category
    delete data.category;
    data.categoryId = categoryId;

    return prismaClient.skill.create({
        data,
        include: { category: true }
    });
};

const update = async (id, data) => {
    id = validate(isID, id);
    data = validate(skillValidation, data);

    const current_skill = await prismaClient.skill.findUnique({ where: { id } });
    if (!current_skill) throw new ResponseError(404, 'Skill not found!');

    // find or create category
    const { id: categoryId } = await find_or_create_category(data.category);

    // update data category
    delete data.category;
    data.categoryId = categoryId;

    const updatedData = await prismaClient.skill.update({
        where: { id },
        data,
        include: { category: true }
    });

    // remove previous skill cateory, if doesnt have skills
    if (current_skill.categoryId != updatedData.categoryId) await removeSkillCategory(current_skill.categoryId);

    return updatedData;
};

const remove = async (id) => {
    id = validate(isID, id);

    const skill = await prismaClient.skill.findUnique({ where: { id } });

    if (!skill) throw new ResponseError(404, 'Skill not found!');

    await prismaClient.skill.delete({ where: { id } });

    // check skills count in the category
    await removeSkillCategory(skill.categoryId);

    return;
};

const find_or_create_category = async (title) => {
    let category = await prismaClient.skillCategory.findUnique({
        where: { title },
        select: { id: true }
    });

    if (!category) {
        category = await prismaClient.skillCategory.create({
            data: { title },
            select: { id: true }
        });
    }

    return category;
};

const removeSkillCategory = async (id) => {
    const category = await prismaClient.skillCategory.findUnique({
        where: { id },
        include: {
            _count: {
                select: {
                    skills: true
                }
            }
        }
    });

    // remove category
    if (!category._count.skills) {
        await prismaClient.skillCategory.delete({
            where: { id: id }
        });
    }

    return;
};

export default {
    getAll,
    getByCategory,
    get,
    create,
    update,
    remove,
};