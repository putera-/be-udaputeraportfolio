import experienceService from '../service/experience-service.js';

const getAll = async (req, res, next) => {
    try {
        const filters = {
            company: req.query.search,
            title: req.query.search,
            description: req.query.search,
            page: req.query.page || 1,
            limit: req.query.limit || 10
        };

        const data = await experienceService.getAll(filters);

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await experienceService.get(id);

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const data = await experienceService.create(req.body);

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await experienceService.update(id, req.body);

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = req.params.id;
        await experienceService.remove(id);

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