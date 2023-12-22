import projectService from "../service/project-service";

const get = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const data = await projectService.create(req.body);

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

    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
}

export default {
    create
}