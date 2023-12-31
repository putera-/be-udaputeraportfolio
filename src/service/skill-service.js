import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";
import { isID, isString, istruthy } from "../validation/all-validation.js";
import { skillCategoryValidation, skillValidation } from "../validation/skill-validation.js"
import { validate } from "../validation/validation.js";

const getAll = async (req) => {
    const category = validate(istruthy, req.query.category);

    return prismaClient.skill.findMany({
        include: { category }
    });
}

const get = async (id) => {
    id = validate(isID, id);

    const skill = await prismaClient.skill.findUnique({
        where: { id },
        include: { category: true }
    });

    if (!skill) throw new ResponseError(404, "Skill not found!");

    return skill;
}

const create = async (request) => {
    let { title, category: category_title } = request;
    title = validate(isString, title);
    category_title = validate(skillCategoryValidation, category_title);

    // find or create category
    const { id: categoryId } = await find_or_create_category(category_title);

    const data_skill = {
        title,
        categoryId
    }
    return prismaClient.skill.create({
        data: data_skill,
        include: { category: true }
    });
}

const update = async (id, data) => {
    id = validate(isID, id);
    let { title, category: category_title } = validate(skillValidation, data);

    const current_skill = await prismaClient.skill.findUnique({
        where: { id },
        select: { id: true }
    })
    if (!current_skill) throw new ResponseError(404, "Skill not found!");

    // find or create category
    const { id: categoryId } = await find_or_create_category(category_title);

    const data_skill = {
        title,
        categoryId
    };

    return prismaClient.skill.update({
        where: { id },
        data: data_skill,
        include: { category: true }
    })
}

const remove = async (id) => {
    id = validate(isID, id);

    const skill = await prismaClient.skill.findUnique({
        where: { id },
        select: { id: true }
    });

    if (!skill) throw new ResponseError(404, "Skill not found!");

    return prismaClient.skill.delete({
        where: { id }
    });
}

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
}

export default {
    getAll,
    get,
    create,
    update,
    remove
}