import dayjs from 'dayjs';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { isID } from '../validation/all-validation.js';
import { blogFilters, blogValidation } from '../validation/blog-validation.js';
import { validate } from '../validation/validation.js';
import fileService from './file-service.js';

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
        });
    }

    // skip based on page & limit
    // (page - 1) * limit
    const page = filters.page;
    const limit = filters.limit;
    const skip = (page - 1) * limit;

    const params = {
        take: limit,
        skip: skip
    };
    if (dbFilters.length) params.where = { OR: dbFilters };

    const blogs = await prismaClient.blog.findMany({
        ...params,
        orderBy: { createdAt: 'desc' },
        include: {
            photos: {
                orderBy: { index: 'asc' }
            }
        }
    });

    const params2 = {};
    if (dbFilters.length) params2.where = { OR: dbFilters };
    const totalBlogs = await prismaClient.blog.count(params2);

    for (const blog of blogs) {
        formatData(blog);
    }

    return {
        data: blogs,
        page,
        total: blogs.length,
        total_data: totalBlogs,
        total_page: Math.ceil(totalBlogs / limit)
    };
};
const get = async (id) => {
    id = validate(isID, id);

    const blog = await prismaClient.blog.findUnique({
        where: { id },
        include: {
            photos: {
                orderBy: {
                    index: 'asc'
                }
            }
        }
    });

    if (!blog) throw new ResponseError(404, 'Blog not found!');

    formatData(blog);
    return blog;
};
const create = async (request, photos) => {
    const data = validate(blogValidation, request);

    const blog = await prismaClient.blog.create({
        data: {
            ...data,
            photos: {
                create: photos
            }
        },
        include: {
            photos: {
                orderBy: { index: 'asc' }
            }
        }
    });

    formatData(blog);
    return blog;
};

const update = async (id, data, newPhotos) => {
    id = validate(isID, id);
    data = validate(blogValidation, data);

    // also get current photos before update
    const current_blog = await prismaClient.blog.findUnique({
        where: { id },
        include: { photos: true }
    });
    if (!current_blog) throw new ResponseError(404, 'Blog not found!');

    // data photos
    // create empty data if null
    if (!data.photos) data.photos = [];

    // collect data photos to update
    const photosUpdate = data.photos.map(p => ({
        where: { id: p.id },
        data: { index: p.index }
    }));

    const keepedIds = data.photos.map(p => p.id);
    const keepedIndexes = data.photos.map(p => p.index);

    // get taken index
    const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // get available index
    const availableIndexes = indexes.filter(i => !keepedIndexes.includes(i));

    // update new photo indexes
    newPhotos = newPhotos.map(p => {
        p.index = availableIndexes[0];
        availableIndexes.shift();
        return p;
    });

    // remove photos from project data
    delete data.photos;

    const blog = await prismaClient.blog.update({
        where: { id },
        data: {
            ...data,
            photos: {
                update: photosUpdate,
                deleteMany: {
                    id: {
                        notIn: keepedIds
                    }
                },
                create: newPhotos
            }
        },
        include: {
            photos: {
                orderBy: {
                    index: 'asc'
                }
            }
        }
    });

    // collect unused photo
    const photo_to_delete = current_blog.photos.filter(p => !keepedIds.includes(p.id));
    // deleted unused photo files
    removePhotos(photo_to_delete);

    formatData(blog);
    return blog;
};

const remove = async (id) => {
    id = validate(isID, id);

    const blog = await prismaClient.blog.findUnique({
        where: { id },
        include: { photos: true }
    });

    if (!blog) throw new ResponseError(404, 'Blog not found!');

    // remove photo files
    removePhotos(blog.photos);

    return prismaClient.blog.delete({
        where: { id }
    });
};

const removePhotos = (photos) => {
    for (const photo of photos) {
        fileService.removeFile(photo.path);
        fileService.removeFile(photo.path_md);
        fileService.removeFile(photo.path_sm);
    }
};

const formatData = (blog) => {
    blog.readDate = dayjs(blog.createdAt).format('DD MMMM YYYY');
    blog.readDateTime = dayjs(blog.createdAt).format('DD MMMM YYYY HH:mm:ss');
    blog.shortDateTime = dayjs(blog.createdAt).format('D MMM YYYY HH:mm');
};

export default {
    getAll,
    get,
    create,
    update,
    remove
};