import { prismaClinet } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";
import { istruthy } from "../validation/all-validation.js";
import { skillCategoryValidation, skillIdValidation, skillTitleValidation, skillValidation } from "../validation/skill-validation.js"
import { validate } from "../validation/validation.js";

const getAll = async (req) => {
    const category = validate(istruthy, req.query.category);

    return prismaClinet.skill.findMany({
        include: {
            category: category
        }
    });
}

const get = async (id) => {
    id = validate(skillIdValidation, id);

    const skill = await prismaClinet.skill.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            title: true,
            category: true
        }
    });

    if (!skill) {
        throw new ResponseError(404, "Skill not found!")
    }

    return skill;
}

const create = async (request) => {
    let { title: skill, category: category_title } = request;
    skill = validate(skillTitleValidation, skill);
    category_title = validate(skillCategoryValidation, category_title);

    // find or create category
    const category = await find_or_create_category(category_title);

    const data_skill = {
        title: skill,
        category_id: category.id
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

const update = async (request) => {
    let { id, title: skill, category: category_title } = validate(skillValidation, request);

    const current_skill = await prismaClinet.skill.findUnique({
        where: {
            id: id
        },
        select: {
            id: true
        }
    })
    if (!current_skill) {
        throw new ResponseError(404, "Skill not found!")
    }

    // find or create category
    const category = await find_or_create_category(category_title);

    const data_skill = {
        title: skill,
        category_id: category.id
    };

    return prismaClinet.skill.update({
        where: {
            id: id
        },
        data: data_skill,
        select: {
            id: true,
            title: true,
            category: true
        }
    })
}

const remove = async (id) => {
    id = validate(skillIdValidation, id);

    const skill = await prismaClinet.skill.findUnique({
        where: {
            id: id
        },
        select: {
            id: true
        }
    });

    if (!skill) {
        throw new ResponseError(404, "Skill not found!")
    }

    return prismaClinet.skill.delete({
        where: {
            id: id
        }
    });
}

const find_or_create_category = async (title) => {
    let category = await prismaClinet.skillCategory.findUnique({
        where: {
            title: title
        },
        select: {
            id: true
        }
    });

    if (!category) {
        category = await prismaClinet.skillCategory.create({
            data: {
                title: title
            },
            select: {
                id: true
            }
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