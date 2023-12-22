import userService from "../service/user-service.js"

const get = async (req, res, next) => {
    try {
        const email = req.user.email;
        const data = await userService.get(email);

        res.status(200).json({
            message: 'Success',
            succes: true,
            data
        });
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const email = req.user.email;
        const data = await userService.update(email, req.body);

        res.status(200).json({
            message: 'Success',
            succes: true,
            data
        });
    } catch (error) {
        next(error);
    }
}

export default {
    get,
    update
}