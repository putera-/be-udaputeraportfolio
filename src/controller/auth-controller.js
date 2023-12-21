import authService from "../service/auth-service.js"

const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body, res);

        res.status(200).json({
            message: "Success",
            success: true,
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const result = await authService.logout(req.user.email);

        res.status(200).json({
            message: "Success",
            success: true
        });
    } catch (error) {
        next(error)
    }
}

export default {
    login,
    logout
}