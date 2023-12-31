import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { isID } from "../validation/all-validation.js";
import { blogValidation } from "../validation/blog-validation.js";
import { validate } from "../validation/validation.js";

const getAll = async () => {
    return prismaClient.blog.findMany();
};
const get = async (id) => {
    id = validate(isID, id);

    const blog = await prismaClient.blog.findUnique({
        where: { id }
    });

    if (!blog) throw new ResponseError(404, "Blog not found!");

    return blog;
}
const create = async (request) => {
    const data = validate(blogValidation, request);

    return prismaClient.blog.create({
        data
    });
}
const update = async (id, data) => {
    id = validate(isID, id);
    data = validate(blogValidation, data);

    const current_blog = await prismaClient.blog.findUnique({
        where: { id },
        select: { id: true }
    })
    if (!current_blog) throw new ResponseError(404, "Blog not found!");

    return prismaClient.blog.update({
        where: { id },
        data
    });
}
const remove = async (id) => {
    id = validate(isID, id);

    const blog = await prismaClient.blog.findUnique({
        where: { id },
        select: { id: true }
    });

    if (!blog) throw new ResponseError(404, "Blog not found!");

    return prismaClient.blog.delete({
        where: { id }
    });
}

export default {
    getAll,
    get,
    create,
    update,
    remove
}