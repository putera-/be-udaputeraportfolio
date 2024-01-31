import blogService from '../service/blog-service.js';
import fileService from '../service/file-service.js';

const getAll = async (req, res, next) => {
    try {
        const filters = {
            title: req.query.search,
            content: req.query.search,
            page: req.query.page || 1,
            perPage: req.query.perpage || 10
        };

        const data = await blogService.getAll(filters);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const data = await blogService.get(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    try {
        // save photos to storate
        const photos = req.files ? await fileService.savePhotos(req.files, uniqueSuffix) : [];

        const data = await blogService.create(req.body, photos);
        res.status(200).json({ data });
    } catch (error) {
        // remove photos
        if (req.files) fileService.removePhotos(req.files, uniqueSuffix);

        next(error);
    }
};

const update = async (req, res, next) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    try {
        // save photos to storate
        const photos = req.files ? await fileService.savePhotos(req.files, uniqueSuffix) : [];

        const id = req.params.id;
        const data = await blogService.update(id, req.body, photos);
        res.status(200).json({ data });
    } catch (error) {
        if (req.files) fileService.removePhotos(req.files, uniqueSuffix);
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        await blogService.remove(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);

    }
};

export default {
    getAll,
    get,
    create,
    update,
    remove
};