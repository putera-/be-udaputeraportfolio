import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { isID } from "../validation/all-validation.js";
import { blogFilters, blogValidation } from "../validation/blog-validation.js";
import { validate } from "../validation/validation.js";

const getAll = async (filters) => {
    filters = validate(blogFilters, filters);

    // filters
    const dbFilters = [];
    if (filters.title) {
        dbFilters.push({
            title: { contains: filters.title }
        });
    }
    if (filters.content) {
        dbFilters.push({
            content: { contains: filters.content }
        })
    }

    // skip based on page & perPage
    // (page - 1) * perPage
    const page = filters.page;
    const perPage = filters.perPage
    const skip = (page - 1) * perPage;

    const blogs = await prismaClient.blog.findMany({
        where: { OR: dbFilters },
        take: perPage,
        skip: skip
    });

    const totalBlogs = await prismaClient.blog.count({
        where: { OR: dbFilters }
    });

    return {
        data: blogs,
        page,
        total: blogs.length,
        total_data: totalBlogs,
        total_page: Math.ceil(totalBlogs / perPage)
    };
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