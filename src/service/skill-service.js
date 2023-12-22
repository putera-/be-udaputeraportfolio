import { prismaClinet } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";
import { isID, istruthy } from "../validation/all-validation.js";
import { skillCategoryValidation, skillTitleValidation, skillValidation } from "../validation/skill-validation.js"
import { validate } from "../validation/validation.js";

const getAll = async (req) => {
    const category = validate(istruthy, req.query.category);

    return prismaClinet.skill.findMany({
        include: { category }
    });
}

const get = async (id) => {
    id = validate(isID, id);

    const skill = await prismaClinet.skill.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            category: true
        }
    });

    if (!skill) throw new ResponseError(404, "Skill not found!");

    return skill;
}

const create = async (request) => {
    let { title, category: category_title } = request;
    title = validate(skillTitleValidation, title);
    category_title = validate(skillCategoryValidation, category_title);

    // find or create category
    const { id: categoryId } = await find_or_create_category(category_title);

    const data_skill = {
        title,
        categoryId
    }
    return prismaClinet.skill.create({
        data: data_skill,
        select: {
            id: true,
            title: true,
            category: true
        }
    });
}

const update = async (id, data) => {
    id = validate(isID, id);
    let { title, category: category_title } = validate(skillValidation, data);

    const current_skill = await prismaClinet.skill.findUnique({
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

    return prismaClinet.skill.update({
        where: { id },
        data: data_skill,
        select: {
            id: true,
            title: true,
            category: true
        }
    })
}

const remove = async (id) => {
    id = validate(isID, id);

    const skill = await prismaClinet.skill.findUnique({
        where: { id },
        select: { id: true }
    });

    if (!skill) throw new ResponseError(404, "Skill not found!");

    return prismaClinet.skill.delete({
        where: {
            id: id
        }
    });
}

const find_or_create_category = async (title) => {
    let category = await prismaClinet.skillCategory.findUnique({
        where: { title },
        select: { id: true }
    });

    if (!category) {
        category = await prismaClinet.skillCategory.create({
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