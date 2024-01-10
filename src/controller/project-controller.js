import projectService from '../service/project-service.js';

const getAll = async (req, res, next) => {
    try {
        const data = await projectService.getAll();

        res.status(200).json({ data });
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
    try {
        const data = await projectService.create(req.body);

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await projectService.update(id, req.body);

        res.status(200).json({ data });
    } catch (error) {
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