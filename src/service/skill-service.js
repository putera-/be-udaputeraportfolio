import { prismaClinet } from "../application/database.js"
import { skillCategoryValidation, skillIdValidation, skillTitleValidation, skillValidation } from "../validation/skill-validation.js"
import { validate } from "../validation/validation.js";

const get = async (id) => {
    id = validate(skillIdValidation, id);

    return prismaClinet.skill.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            title: true,
            category: true
        }
    });
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

    // find or create category
    const category = await find_or_create_category(category_title);

    const data_skill = {
        title: skill,
        category_id: category.id
    }
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
    get,
    create,
    update
}