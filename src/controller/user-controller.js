import userService from '../service/user-service.js';


const create_user = async (req, res, next) => {
    try {
        const data = await userService.create_user(req.body);

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const is_user_exist = async (req, res, next) => {
    try {
        const exist = await userService.is_user_exist();

        res.status(200).json({ exist });
    } catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const email = req.user.email;
        const data = await userService.get(email);

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        // got email from middleware
        const email = req.user.email;
        const data = await userService.update(email, req.body, res);

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

export default {
    is_user_exist,
    create_user,
    get,
    update
};