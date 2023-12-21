import skillService from "../service/skill-service.js"

const get = async (req, res, next) => {
    try {
        const data = await skillService.get(req.params.id)
        res.status(200).json({
            message: "Success",
            success: true,
            data: data
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
            data: data
        });
    } catch (error) {
        next(error);
    }
}

export default {
    get,
    create
}