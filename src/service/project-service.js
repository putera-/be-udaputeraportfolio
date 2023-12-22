import { prismaClient } from "../application/database.js"
import { projectValidation } from "../validation/project-validation.js"
import { validate } from "../validation/validation.js"

const _select = {
    id: true,
    title: true,
    description: true,
    url: true,
    github: true,
    gitlab: true,
    startDate: true,
    endDate: true,
    status: true
}

const getAll = async () => {

}

const get = async () => {

}

const create = async (data) => {
    data = validate(projectValidation, data);

    return prismaClient.project.create({
        data,
        select: _select
    });
}
const update = async () => {

}
const remove = async () => {

}

export default {
    create
}
