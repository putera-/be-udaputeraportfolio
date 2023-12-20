import userService from "../service/user-service.js"

const getUser = async (req, res, next) => {
    try {
        const email = req.user.email;
        const result = await userService.get(email);

        res.status(200).json({
            message: 'Success',
            succes: true,
            data: result
        });
    } catch (error) {
        next(error)
    }
}

export default {
    getUser
}