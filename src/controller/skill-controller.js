import skillService from "../service/skill-service.js"

const getAll = async (req, res, next) => {
    try {
        const data = await skillService.getAll(req)
        res.status(200).json({
            message: "Success",
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
}

const get = async (req, res, next) => {
    try {
        const data = await skillService.get(req.params.id)
        res.status(200).json({
            message: "Success",
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const data = await skillService.create(req.body)
        res.status(200).json({
            message: "Success",
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await skillService.update(id, req.body)
        res.status(200).json({
            message: "Success",
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        await skillService.remove(req.params.id);
        res.status(200).json({
            message: "Success",
            success: true
        });
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