import blogService from "../service/blog-service.js"

const getAll = async (req, res, next) => {
    try {
        const data = await blogService.getAll(req)
        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
}

const get = async (req, res, next) => {
    try {
        const data = await blogService.get(req.params.id)
        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const data = await blogService.create(req.body)
        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await blogService.update(id, req.body)
        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        await blogService.remove(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);

    }
}

export default {
    getAll,
    get,
    create,
    update,
    remove
}