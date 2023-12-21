import { prismaClinet } from "../application/database.js"
import { skillCategoryValidation, skillIdValidation, skillValidation } from "../validation/skill-validation.js"
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
    skill = validate(skillValidation, skill);
    category_title = validate(skillCategoryValidation, category_title);

    let category = await prismaClinet.skillCategory.findUnique({
        where: {
            title: category_title
        },
        select: {
            id: true
        }
    });

    if (!category) {
        category = await prismaClinet.skillCategory.create({
            data: {
                title: category_title
            },
            select: {
                id: true
            }
        });
    }

    // add category
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
    })
}

export default {
    get,
    create
}