import authService from "../service/auth-service.js"

const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);

        // save token to cookie
        authService.set_cookie(res, result.token);

        res.status(200).json({
            message: "Success",
            success: true,
            data: result
        });
    } catch (error) {
        next(error)
    }
}

export default {
    login
}