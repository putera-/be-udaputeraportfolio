import educationService from '../service/education-service.js';

const getAll = async (req, res, next) => {
    try {
        const data = await educationService.getAll();

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const id = req.params.id;

        const data = await educationService.get(id);

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const data = await educationService.create(req.body);

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await educationService.update(id, req.body);

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        await educationService.remove(req.params.id);

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