import authService from "../service/auth-service.js"

const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);

        // save token to cookie
        // expire 1 day
        const maxAge = 24 * 60 * 60 * 1000;
        res.cookie('token', result.token, {
            httpOnly: true,
            maxAge: maxAge
        })

        res.status(200).json({
            message: "Success",
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export default {
    login
}