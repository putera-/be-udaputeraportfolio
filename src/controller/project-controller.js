import fileService from '../service/file-service.js';
import projectService from '../service/project-service.js';

const getAll = async (req, res, next) => {
    try {
        const filters = {
            title: req.query.search,
            description: req.query.search,
            company: req.query.search,
            page: req.query.page || 1,
            perPage: req.query.perpage || 10
        };

        const data = await projectService.getAll(filters);

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await projectService.get(id);

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    try {
        // save photos to storate
        const photos = req.files ? await fileService.savePhotos(req.files, uniqueSuffix) : [];

        const data = await projectService.create(req.body, photos);

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
        const data = await projectService.update(id, req.body, photos);

        res.status(200).json({ data });
    } catch (error) {
        if (req.files) fileService.removePhotos(req.files, uniqueSuffix)
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = req.params.id;
        await projectService.remove(id);

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